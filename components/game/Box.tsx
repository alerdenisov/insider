import { Component, Prop } from 'nuxt-property-decorator'
import GameObject from './GameObject'

interface BoxProps {
  weight: number
}

@Component({
  name: 'e-Box'
})
export default class Box extends GameObject<BoxProps> implements BoxProps {
  @Prop({ default: 10 })
  weight!: number

  get size() {
    return Math.sqrt(this.weight) / 10
  }

  body: any = null
  shape: any = null

  start() {
    if (this.engine) {
      this.shape = new Box2D.b2PolygonShape()
      this.shape.SetAsBox(this.size, this.size)
      let bd = new Box2D.b2BodyDef()
      bd.set_type(this.engine!.box2d.b2_dynamicBody)
      bd.set_position(new Box2D.b2Vec2(0, 0))
      const body = (this.body = this.engine!.world.CreateBody(bd))

      body.CreateFixture(this.shape, this.weight * 0.01)
      body.SetLinearDamping(0.5)
      body.SetTransform(new Box2D.b2Vec2((1 - Math.random() * 2) * 16, 15), 0.0)
      body.SetLinearVelocity(new Box2D.b2Vec2(0, 0))
      body.SetAwake(1)
      body.SetActive(1)
    }
  }

  update(dt: number) {}

  destoy() {
    this.engine!.box2d.destroy(this.body)
    this.engine!.box2d.destroy(this.shape)
  }
}
