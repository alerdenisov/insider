import { Component } from 'nuxt-property-decorator'
import GameObject from './GameObject'

interface FloorProps {
  onBody?: (evt: number) => void
}

@Component({
  name: 'e-Floor'
})
export default class Floor extends GameObject<FloorProps> {
  body: any = null
  shape: any = null

  start() {
    if (this.engine) {
      this.shape = new Box2D.b2EdgeShape()
      this.shape.Set(new Box2D.b2Vec2(-40.0, 0.0), new Box2D.b2Vec2(40.0, 0.0))
      let bd = new Box2D.b2BodyDef()
      const body = (this.body = this.engine!.world.CreateBody(bd))
      body.CreateFixture(this.shape, 0.0)

      this.$emit('body', body.ptr)
    }
  }

  update(dt: number) {}
}
