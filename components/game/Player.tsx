import { Vue, Component, Watch, Prop } from 'nuxt-property-decorator'
import { TsxComponent } from '~/types'
import World from './World'
import { CreateElement } from 'vue'
import GameObject from './GameObject'

interface PlayerProps {
  move: -1 | 0 | 1
  speed?: number
}

const flip = 180.0 * 0.0174532925199432957

@Component({
  name: 'e-Player'
})
export default class Player extends GameObject<PlayerProps>
  implements PlayerProps {
  @Prop({ required: true })
  move!: -1 | 0 | 1

  @Prop({ default: 10 })
  speed!: number

  body: any = null
  shape: any = null

  start() {
    if (this.engine) {
      this.shape = createTrianglePolygonShape(2)
      let bd = new Box2D.b2BodyDef()
      bd.set_type(this.engine!.box2d.b2_dynamicBody)
      bd.set_position(new Box2D.b2Vec2(0, 0))
      const body = (this.body = this.engine!.world.CreateBody(bd))

      body.CreateFixture(this.shape, 5)
      body.SetLinearDamping(10)
      body.SetAngularDamping(10)
      body.SetTransform(new Box2D.b2Vec2(0, 0), flip)
      body.SetLinearVelocity(new Box2D.b2Vec2(0, 0))
      body.SetAwake(1)
      body.SetActive(1)
    }
  }

  shake() {
    this.body.ApplyForceToCenter(new Box2D.b2Vec2(0, 10 * this.speed))
  }

  update(dt: number) {
    console.log(this.move)
    if (this.move !== 0) {
      this.body.SetLinearVelocity(new Box2D.b2Vec2(this.move * this.speed, 0))
    }
  }
}
