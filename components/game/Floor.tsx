import { Vue, Component, Watch, Prop } from 'nuxt-property-decorator'
import { TsxComponent } from '~/types'
import World from './World'
import { CreateElement } from 'vue'
import GameObject from './GameObject'

interface FloorProps {}

@Component({
  name: 'e-Floor'
})
export default class Floor extends GameObject<FloorProps>
  implements FloorProps {
  body: any = null
  shape: any = null

  start() {
    if (this.engine) {
      this.shape = new Box2D.b2EdgeShape()
      this.shape.Set(new Box2D.b2Vec2(-40.0, 0.0), new Box2D.b2Vec2(40.0, 0.0))
      let bd = new Box2D.b2BodyDef()
      const body = (this.body = this.engine!.world.CreateBody(bd))
      body.CreateFixture(this.shape, 0.0)
    }
  }

  update(dt: number) {}
}
