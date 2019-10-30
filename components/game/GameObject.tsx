import { Vue, Component } from 'nuxt-property-decorator'
import { TsxComponent } from '~/types'
import World from './World'
import { CreateElement } from 'vue'

interface GameObjectProps {}

@Component({
  name: 'e-object'
})
export default class GameObject<TProps = {}>
  extends TsxComponent<GameObjectProps & TProps>
  implements GameObjectProps {
  engine: World | null = null

  findParent(node: World) {
    if (node.world) {
      return node
    }

    if (node.$parent) {
      return this.findParent(node.$parent as World)
    }

    return null
  }

  mounted() {
    this.engine = this.findParent(this.$parent as World)
    if (this.engine) {
      this.engine.register(this)
    }
  }

  beforeDestroy() {
    if (this.engine) this.engine.unregister(this)
  }

  render(h: CreateElement) {
    return <span />
  }

  update() {}
}
