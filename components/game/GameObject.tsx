import { Component, Prop } from 'nuxt-property-decorator'
import { CreateElement } from 'vue'
import { TsxComponent } from '~/types'
import Engine from './World'

interface GameObjectProps {
  x?: number
  y?: number
  r?: number

  onEnable?: (obj: GameObject) => void
  onDisable?: (obj: GameObject) => void
}

@Component({
  name: 'e-object'
})
export default class GameObject<TProps = {}>
  extends TsxComponent<GameObjectProps & TProps>
  implements GameObjectProps {
  engine: Engine | null = null

  @Prop({ default: 0 })
  r!: number

  @Prop({ default: 0 })
  x!: number

  @Prop({ default: 0 })
  y!: number

  get angle() {
    return this.r * 0.0174532925199432957
  }

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
      this.$emit('enable', this)
    })
  }
  beforeDestroy() {
    if (this.engine) {
      this.engine.unregister(this)
    }
    this.$emit('disable', this)
  }

  render(h: CreateElement) {
    return <span />
  }

  end() {}
  _end() {
    this.$emit('disable', this)
    this.end()
  }
  start() {}
  _start() {
    this.$emit('enable', this)
    this.start()
  }
  update(dt: number) {}
}
