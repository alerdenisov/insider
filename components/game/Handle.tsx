import { Component, Prop } from 'nuxt-property-decorator'
import GameObject from './GameObject'
import PhysicObject from './PhysicObject'

interface HandleProps {
  height?: number
  width?: number
}

@Component({
  name: 'e-handle'
})
export default class Handle extends PhysicObject<HandleProps>
  implements HandleProps {
  body: any = null
  shape: any = null

  @Prop({ default: 15 })
  width!: number

  @Prop({ default: 0.5 })
  height!: number

  buildBody() {
    let bd = new Box2D.b2BodyDef()
    bd.set_type(this.engine!.box2d.b2_dynamicBody)
    return this.engine!.world.CreateBody(bd)
  }

  buildShape() {
    this.shape = new Box2D.b2PolygonShape()
    this.shape.SetAsBox(this.width, this.height)
    return this.shape
  }
}

type Edge = {
  get_other(): typeof Box2D['b2Body']
  get_contact(): { ptr: number }
  get_prev(): Edge
  get_next(): Edge
}
