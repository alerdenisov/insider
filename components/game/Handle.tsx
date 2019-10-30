import { Component, Prop } from 'nuxt-property-decorator'
import GameObject from './GameObject'

interface HandleProps {
  floorPtr: number
  onCollide?: () => void
}

@Component({
  name: 'e-handle'
})
export default class Handle extends GameObject<HandleProps>
  implements HandleProps {
  body: any = null
  shape: any = null

  @Prop({ default: 0 })
  floorPtr!: number

  start() {
    if (this.engine) {
      this.shape = new Box2D.b2PolygonShape()
      this.shape.SetAsBox(16, 0.3)
      let bd = new Box2D.b2BodyDef()
      bd.set_type(this.engine!.box2d.b2_dynamicBody)
      bd.set_position(new Box2D.b2Vec2(0, 0))
      const body = (this.body = this.engine!.world.CreateBody(bd))

      body.CreateFixture(this.shape, 5.0)
      body.SetLinearDamping(2)
      body.SetAngularDamping(2)
      body.SetTransform(new Box2D.b2Vec2(0, 4), 0.0)
      body.SetLinearVelocity(new Box2D.b2Vec2(0, 0))
      body.SetAwake(1)
      body.SetActive(1)
    }
  }

  update(dt: number) {
    let edge = this.body.GetContactList()
    while (edge.ptr > 0) {
      if (edge.get_other().ptr === this.floorPtr) {
        this.$emit('collide')
        this.body.SetAwake(0)
        this.body.SetActive(0)
        return
      }

      edge = edge.get_next()
    }
  }
}

type Edge = {
  get_other(): typeof Box2D['b2Body']
  get_contact(): { ptr: number }
  get_prev(): Edge
  get_next(): Edge
}
