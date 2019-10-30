import Vue, { VNode, VNodeDirective } from 'vue'

function getComponentName(node: VNode): string {
  if (
    node.context &&
    node.context.$options &&
    (node.context.$options.name || (<any>node.context.$options)._componentTag)
  )
    return (
      node.context.$options.name || (<any>node.context.$options)._componentTag
    )
  return 'na'
}

function getModificators(node: VNode) {
  if (node.context) {
    let propMod = {}
    let calcMod = {}
    let argMod = {}
    let anynode = node as any
    if (anynode.context && anynode.context.mods) {
      propMod = anynode.context.mods
    }

    if (anynode.context && anynode.context.modificators) {
      calcMod = anynode.context.modificators
    }

    if (anynode.data && anynode.data.attrs && anynode.data.attrs.mods) {
      argMod = anynode.data.attrs.mods
    }

    return Object.assign({}, argMod, calcMod, propMod)
  }
  return {}
}

function isObject(someting: any) {
  return (
    someting &&
    typeof someting === 'object' &&
    someting !== null &&
    someting.constructor === Object
  )
}

function isString(val: any): boolean {
  return val && typeof val === 'string' && val.length > 0
}

const core = (el: HTMLElement, binding: any, node: VNode) => {
  let block = getComponentName(node)

  let bemClasses = block

  if (binding.arg) {
    bemClasses += `__${binding.arg}`
  }

  const mods = Object.assign(
    {},
    binding.modifiers || {},
    isObject(binding.value) ? binding.value : {},
    getModificators(node)
  )

  bemClasses += Object.keys(mods).reduce((prev, name) => {
    const val = mods[name]
    if (typeof val === 'boolean') {
      if (val) {
        prev += ` ${bemClasses}--${name}`
      }
    } else if (isString(val) || typeof val === 'number') {
      prev += ` ${bemClasses}--${name}-${mods[name]}`
    }

    return prev
  }, '')

  const className =
    typeof el.className === 'string'
      ? el.className
      : (el.className as SVGAnimatedString).animVal

  const filteredName = className
    .split(' ')
    .filter((c) => !c.startsWith(block))
    .join(' ')

  el.setAttribute('class', filteredName)
  el.classList.add(...bemClasses.split(' '))
}

const watchers: { [key: string]: Function } = {}

function getWatcherKey(component: Vue, bindings: VNodeDirective) {
  /* eslint-disable-next-line no-underscore-dangle */
  return (component as any)['_uid'] + bindings.name
}

function addWatcher(
  component: Vue,
  bindings: VNodeDirective,
  unwatch: Function
) {
  const key = getWatcherKey(component, bindings)
  watchers[key] = unwatch
}

function removeWatcher(component: Vue, bindings: VNodeDirective) {
  const key = getWatcherKey(component, bindings)
  if (typeof watchers[key] === 'function') {
    watchers[key]()
    delete watchers[key]
  }
}

Vue.directive('bem', {
  bind(el: HTMLElement, binding: VNodeDirective, node: VNode) {
    const component = node.context!
    const unwatch = component.$watch('modificators', (newMod) => {
      core(el, binding, node)
    })

    addWatcher(component, binding, unwatch)

    core(el, binding, node)
  },
  update(el: HTMLElement, binding: VNodeDirective, node: VNode) {
    core(el, binding, node)
  },
  unbind(el: HTMLElement, binding: VNodeDirective, node: VNode) {
    removeWatcher(node.context!, binding)
  }
})

type Mods = { [key: string]: boolean | string }

Vue.mixin({
  props: {
    mods: {
      required: false,
      type: Object,
      default: () => {}
    }
  },
  methods: {
    $bem(elOrMods?: string | Mods, mods?: Mods) {
      const arg = typeof elOrMods === 'string' ? elOrMods : undefined
      const modifiers = typeof elOrMods === 'object' ? elOrMods : mods
      return {
        directives: [{ name: 'bem', arg, modifiers }]
      }
    }
  }
})
