import { Component, Prop } from 'nuxt-property-decorator'
import { CreateElement } from 'vue'
import { TsxComponent } from '~/types'
import Engine from './World'

interface GameObjectProps {
  x?: number
  y?: number
}

@Component({
  name: 'e-object'
})
export default class GameObject<TProps = {}>
  extends TsxComponent<GameObjectProps & TProps>
  implements GameObjectProps {
  engine: Engine | null = null

  @Prop({ default: 0 })
  x!: number

  @Prop({ default: 0 })
  y!: number

  get position() {
    return {
      x: this.x,
      y: this.y
    }
  }

  findParent(node: Engine) {
    if (!!node.world) {
      return node
    }

    if (!!node.$parent) {
      return this.findParent(node.$parent as Engine)
    }

    return null
  }

  mounted() {
    this.$nextTick(() => {
      this.engine = this.findParent(this.$parent as Engine)
      if (this.engine) {
        this.engine.register(this)
      }
    })
  }

  beforeDestroy() {
    console.log('destoying ' + this['_uid'])
    if (this.engine) this.engine.unregister(this)
  }

  render(h: CreateElement) {
    return <span />
  }

  destroy() {}
  start() {}
  update(dt: number) {}
}
