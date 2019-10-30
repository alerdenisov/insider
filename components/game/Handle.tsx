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
      var bd_ground = new Box2D.b2BodyDef()
      var groundBody = this.engine.world.CreateBody(bd_ground)
      var shape0 = new Box2D.b2EdgeShape()
      shape0.Set(new Box2D.b2Vec2(-40.0, -6.0), new Box2D.b2Vec2(40.0, -6.0))
      groundBody.CreateFixture(shape0, 0.0)
      shape0.Set(new Box2D.b2Vec2(-9.0, -6.0), new Box2D.b2Vec2(-9.0, -4.0))
      groundBody.CreateFixture(shape0, 0.0)
      shape0.Set(new Box2D.b2Vec2(9.0, -6.0), new Box2D.b2Vec2(9.0, -4.0))
      groundBody.CreateFixture(shape0, 0.0)

      var cshape = new Box2D.b2CircleShape()
      cshape.set_m_radius(0.5)
      var ZERO = new Box2D.b2Vec2(0, 0)
      var temp = new Box2D.b2Vec2(0, 0)

      Array(20)
        .fill(0)
        .map((_, i) => {
          var bd = new Box2D.b2BodyDef()
          // bd.set_type(b2_dynamicBody);
          bd.set_type(this.engine!.box2d.b2_dynamicBody)
          bd.set_position(ZERO)
          var body = this.engine!.world.CreateBody(bd)
          var randomValue = Math.random()
          if (randomValue < 0.2) body.CreateFixture(cshape, 1.0)
          else body.CreateFixture(createRandomPolygonShape(0.5), 1.0)
          temp.Set(16 * (Math.random() - 0.5), 4.0 + 2.5 * i)
          body.SetTransform(temp, 0.0)
          body.SetLinearVelocity(ZERO)
          body.SetAwake(1)
          body.SetActive(1)
        })
    }
  }

  update() {
    console.log('init')
  }
}
