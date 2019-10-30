import { Component, Prop } from 'nuxt-property-decorator'
import GameObject from './GameObject'
import PhysicObject from './PhysicObject'

interface PlayerProps {
  move: -1 | 0 | 1
  speed?: number
}

@Component({
  name: 'e-Player'
})
export default class Player extends PhysicObject<PlayerProps>
  implements PlayerProps {
  @Prop({ required: true })
  move!: -1 | 0 | 1

  @Prop({ default: 10 })
  speed!: number

  buildShape() {
    return createTrianglePolygonShape(2)
  }
  buildBody() {
    let bd = new Box2D.b2BodyDef()
    bd.set_type(this.engine!.box2d.b2_dynamicBody)
    bd.set_position(new Box2D.b2Vec2(0, 0))
    return this.engine!.world.CreateBody(bd)
  }

  // start() {
  //   if (this.engine) {
  //     let bd = new Box2D.b2BodyDef()
  //     bd.set_type(this.engine!.box2d.b2_dynamicBody)
  //     bd.set_position(new Box2D.b2Vec2(0, 0))
  //     const body = (this.body = this.engine!.world.CreateBody(bd))

  //     body.CreateFixture(this.shape, 5)
  //     body.SetLinearDamping(10)
  //     body.SetAngularDamping(10)
  //     body.SetTransform(new Box2D.b2Vec2(0, 0), flip)
  //     body.SetLinearVelocity(new Box2D.b2Vec2(0, 0))
  //     body.SetAwake(1)
  //     body.SetActive(1)
  //   }
  // }

  // shake() {
  //   this.body.ApplyForceToCenter(new Box2D.b2Vec2(0, 10 * this.speed))
  // }

  update(dt: number) {
    if (this.move !== 0) {
      this.body.SetLinearVelocity(new Box2D.b2Vec2(this.move * this.speed, 0))
    }
  }
}
