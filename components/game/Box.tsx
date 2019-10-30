import { Component, Prop } from 'nuxt-property-decorator'
import GameObject from './GameObject'
import PhysicObject from './PhysicObject'
import Engine from './World'

interface BoxProps {
  scale?: number
  weight: number
}

@Component({
  name: 'e-Box'
})
export default class Box extends PhysicObject<BoxProps> implements BoxProps {
  @Prop({ default: 10 })
  weight!: number

  @Prop({ default: 0.5 })
  scale!: number

  get isBox() {
    return true
  }

  get size() {
    return Math.sqrt(this.weight * this.scale)
  }

  buildBody(engine: Engine) {
    let bd = new Box2D.b2BodyDef()
    bd.set_type(engine!.box2d.b2_dynamicBody)
    return engine!.world.CreateBody(bd)
  }

  buildShape(engine: Engine) {
    const shape = new Box2D.b2PolygonShape()
    shape.SetAsBox(this.size, this.size)
    return shape
  }
}
