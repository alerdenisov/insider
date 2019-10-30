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
  body: any = null
  shape: any = null

  start() {
    if (this.engine) {
      this.shape = new Box2D.b2PolygonShape()
      this.shape.SetAsBox(12, 0.15)
      let bd = new Box2D.b2BodyDef()
      bd.set_type(this.engine!.box2d.b2_dynamicBody)
      bd.set_position(new Box2D.b2Vec2(0, 0))
      const body = (this.body = this.engine!.world.CreateBody(bd))

      body.CreateFixture(this.shape, 5.0)
      body.SetLinearDamping(2)
      body.SetAngularDamping(2)
      body.SetTransform(new Box2D.b2Vec2(0, 3), 0.0)
      body.SetLinearVelocity(new Box2D.b2Vec2(0, 0))
      body.SetAwake(1)
      body.SetActive(1)
    }
  }

  update(dt: number) {}
}
