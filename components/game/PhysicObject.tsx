import { Component, Prop, Watch } from 'nuxt-property-decorator'
import GameObject from './GameObject'
import Engine from './World'

enum Contacts {
  Enter,
  Stay,
  Exit
}

interface PhysicObjectProps {
  awake?: boolean
  active?: boolean
  initialVelocity?: { x: number; y: number }
  linearDamping?: number
  angularDamping?: number
  density?: number

  onCollisionExit?: (body: any) => void
  onCollisionEnter?: (body: any) => void
  onCollisionStay?: (body: any) => void

  listen?: true
}

@Component({
  name: 'e-PhysicObject'
})
export default class PhysicObject<TProp = {}>
  extends GameObject<PhysicObjectProps & TProp>
  implements PhysicObjectProps {
  body: any = null
  shape: any = null

  @Prop({ default: false })
  listen!: true
  @Prop({ default: true })
  awake!: boolean
  @Prop({ default: true })
  active!: boolean
  @Prop({ default: false })
  initialVelocity!: { x: number; y: number }
  @Prop({ default: 0.1 })
  linearDamping!: number
  @Prop({ default: 0.1 })
  angularDamping!: number
  @Prop({ default: 1 })
  density!: number

  collisions: {
    [ptr: string]: any
  } = {}

  @Prop({ default: false })
  onCollisionExit!: PhysicObjectProps['onCollisionExit']
  @Prop({ default: false })
  onCollisionEnter!: PhysicObjectProps['onCollisionEnter']
  @Prop({ default: false })
  onCollisionStay!: PhysicObjectProps['onCollisionStay']

  on_awake() {
    this.updateFixture()
  }

  get position() {
    const pos = this.body.GetPosition()
    return {
      x: pos.x,
      y: pos.y
    }
  }

  buildBody(engine: Engine): any {
    return null
  }

  buildShape(engine: Engine): any {
    return null
  }

  start() {
    if (this.engine) {
      const shape = (this.shape = this.buildShape(this.engine))
      const body = (this.body = this.buildBody(this.engine))

      if (body && shape) {
        this.updateFixture()

        if (this.initialVelocity) {
          this.body.SetLinearVelocity(
            new Box2D.b2Vec2(this.initialVelocity.x, this.initialVelocity)
          )
        }

        this.body.SetTransform(new Box2D.b2Vec2(this.x, this.y), this.angle)
      }
    }
  }

  @Watch('awake')
  @Watch('active')
  @Watch('linearDamping')
  @Watch('angularDamping')
  @Watch('density')
  updateFixture() {
    this.body.CreateFixture(this.shape, this.density)
    this.body.SetLinearDamping(this.linearDamping)
    this.body.SetAngularDamping(this.angularDamping)
    this.body.SetAwake(+this.awake)
    this.body.SetActive(+this.active)
  }

  update(dt: number) {
    if (this.listen) {
      let edge = this.body.GetContactList()
      let list = JSON.parse(JSON.stringify(this.collisions))

      Object.values(list).forEach((s: any) => (s.status = Contacts.Exit))

      while (edge.ptr > 0) {
        const body = edge.get_other()
        const ptr = body.ptr

        if (typeof list[ptr] === 'undefined') {
          list[ptr] = { body, status: Contacts.Enter }
        } else {
          list[ptr].status = Contacts.Stay
        }

        edge = edge.get_next()
      }

      for (let ptr in list) {
        if (list[ptr].status === Contacts.Exit) {
          this.$emit('collisionExit', list[ptr].body)
          delete list[ptr]
        } else if (list[ptr].status === Contacts.Enter) {
          this.$emit('collisionEnter', list[ptr].body)
        }
      }
      this.collisions = list
    }
  }

  end() {
    console.log('destroy body')
    this.engine!.world.DestroyBody(this.body)
  }
}
