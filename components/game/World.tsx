import { Component, Prop, Watch } from 'nuxt-property-decorator'
import { CreateElement } from 'vue'
import { TsxComponent } from '~/types'
import GameObject from './GameObject'

const e_shapeBit = 0x0001
const e_jointBit = 0x0002
const e_aabbBit = 0x0004
const e_pairBit = 0x0008
const e_centerOfMassBit = 0x0010
const DEFINED: any = null

export interface EngineProps {
  width: number
  height: number
  zoom: number

  view?: { x: number; y: number }

  pause?: true
  nodraw?: true
}

@Component({
  name: 'e-engine'
})
export default class Engine extends TsxComponent<EngineProps>
  implements EngineProps {
  @Prop({ required: true })
  width!: number
  @Prop({ required: true })
  height!: number
  @Prop({ default: () => ({ x: 0, y: 0 }) })
  view!: { x: number; y: number }
  @Prop({ required: true })
  zoom!: number
  @Prop({ default: false })
  pause!: true
  @Prop({ default: false })
  nodraw!: true

  objects: { [key: string]: GameObject } = {}

  get translate() {
    return [
      this.canvasOffset.x + this.view.x,
      this.canvasOffset.y + this.view.y
    ]
  }

  box2d: typeof Box2D = DEFINED
  world: Box2D.b2World = DEFINED
  canvas: HTMLCanvasElement = DEFINED
  context: CanvasRenderingContext2D = DEFINED
  canvasOffset: { x: number; y: number } = { x: 0, y: 0 }
  debugDraw: any = DEFINED
  mouseJointGroundBody: any = DEFINED
  frametime: number = 0
  frameTime60: number = 0

  onMouseMove(evt: MouseEvent) {}
  onMouseOut(evt: MouseEvent) {}
  onMouseDown(evt: MouseEvent) {}
  onMouseUp(evt: MouseEvent) {}
  onKeyDown(evt: KeyboardEvent) {}
  onKeyUp(evt: KeyboardEvent) {}

  mounted() {
    this.box2d = Box2D
    // const Box2D = Box2D || {}
    if (this.box2d) {
      this.init()
    }
  }

  get items() {
    return Object.values(this.objects)
  }

  init() {
    this.canvas = this.$refs['canvas'] as HTMLCanvasElement
    this.context = this.canvas.getContext('2d')!

    // const bubbleUp = (evt: string) =>
    //   this.canvas.addEventListener(evt, (e) => this.$emit(evt, e))

    // bubbleUp('mousemove')
    // bubbleUp('mousedown')
    // bubbleUp('mouseup')
    // bubbleUp('mouseout')
    // bubbleUp('keydown')
    // bubbleUp('keyup')

    this.debugDraw = getCanvasDebugDraw(this.context)
    this.debugDraw.SetFlags(e_shapeBit)

    this.createWorld()
    this.createScene()
    this.resize()
  }

  resetScene() {
    this.createWorld()
    this.items.forEach((i) => i._start())
  }

  createWorld() {
    if (this.world != null) this.box2d.destroy(this.world)

    this.world = new this.box2d.b2World(new this.box2d.b2Vec2(0.0, -9.81))
    this.world.SetDebugDraw(this.debugDraw)

    this.mouseJointGroundBody = this.world.CreateBody(
      new this.box2d.b2BodyDef()
    )
  }

  createScene() {}

  register(obj: GameObject) {
    const key = obj['_uid']
    if (typeof this.objects[key] === 'undefined') {
      obj._start()
      this.$set(this.objects, key, obj)
    }
  }

  unregister(obj: GameObject) {
    const key = obj['_uid']
    if (typeof this.objects[key] !== 'undefined') {
      obj._end()
      this.$delete(this.objects, key)
    }
  }

  @Watch('width')
  @Watch('height')
  resize() {
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.canvasOffset.x = this.canvas!.width / 2
    this.canvasOffset.y = this.canvas!.height / 2
  }

  draw() {
    //black background
    this.context.fillStyle = '#191e38'
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.context.save()
    this.context.translate(this.translate[0], this.translate[1])
    this.context.scale(1, -1)
    this.context.scale(this.zoom, this.zoom)
    this.context.lineWidth /= this.zoom

    drawAxes(this.context)
    this.context.fillStyle = 'rgb(255,255,0)'
    this.world.DrawDebugData()

    this.context.restore()
  }

  step(dt: number) {
    this.world.Step(dt / 1000, 3, 2)
    this.frametime = dt
    this.frameTime60 = this.frameTime60 * (59 / 60) + this.frametime * (1 / 60)
  }

  update(dt: number) {
    this.step(dt)
    this.draw()

    this.items.forEach((i) => i.update(dt))
  }
  render(h: CreateElement) {
    return (
      <div {...this.$bem()}>
        <canvas
          ref="canvas"
          width="800"
          height="650"
          {...this.$bem('canvas')}
        />
        {this.$slots.default}
      </div>
    )
  }
}
