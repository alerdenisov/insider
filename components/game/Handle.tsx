import { Vue, Component, Watch } from 'nuxt-property-decorator'
import { TsxComponent } from '~/types'
import World from './World'
import { CreateElement } from 'vue'
import GameObject from './GameObject'

interface HandleProps {}

@Component({
  name: 'e-handle'
})
export default class Handle extends GameObject<HandleProps>
  implements HandleProps {
  @Watch('engine')
  onEngine() {
    if (this.engine) {
      var bodyDef = new this.engine.box2d.b2BodyDef()
      bodyDef.set_position(new this.engine.box2d.b2Vec2(0.0, 4.0))
      var ground = this.engine.world.CreateBody(bodyDef)
    }
  }

  update() {}
}
