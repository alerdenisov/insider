import { Component, Prop } from 'nuxt-property-decorator'
import GameObject from './GameObject'
import PhysicObject from './PhysicObject'

interface FloorProps {
  width?: number
  // onBody?: (evt: number) => void
}

@Component({
  name: 'e-Floor'
})
export default class Floor extends PhysicObject<FloorProps> {
  body: any = null
  shape: any = null

  @Prop({ default: 50 })
  width!: number

  buildShape(engine) {
    const shape = new Box2D.b2EdgeShape()
    shape.Set(
      new Box2D.b2Vec2(-this.width, 0.0),
      new Box2D.b2Vec2(this.width, 0.0)
    )
    return shape
  }

  buildBody(engine) {
    let bd = new Box2D.b2BodyDef()
    return engine.world.CreateBody(bd)
  }
}
