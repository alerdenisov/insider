import { Component, Prop, Watch } from 'nuxt-property-decorator'
import { CreateElement } from 'vue'
import { TsxComponent } from '~/types'
import GameObject from './GameObject'

const requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window['mozRequestAnimationFrame'] ||
    window['oRequestAnimationFrame'] ||
    window['msRequestAnimationFrame'] ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60)
    }
  )
})()

const e_shapeBit = 0x0001
const e_jointBit = 0x0002
const e_aabbBit = 0x0004
const e_pairBit = 0x0008
const e_centerOfMassBit = 0x0010
const DEFINED: any = null

export interface WorldProps {
  width: number
  height: number

  view?: { x: number; y: number }

  pause?: true
  nodraw?: true
}

@Component({
  name: 'e-world'
})
export default class World extends TsxComponent<WorldProps>
  implements WorldProps {
  @Prop({ required: true })
  width!: number
  @Prop({ required: true })
  height!: number
  @Prop({ default: () => ({ x: 0, y: 0 }) })
  view!: { x: number; y: number }
  @Prop({ default: false })
  pause!: true
  @Prop({ default: false })
  nodraw!: true

  objects: GameObject[] = []

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
    this.box2d = window.Box2D()
    // const Box2D = Box2D || {}
    if (this.box2d) {
      this.init()
      this.update()
    }
  }

  init() {
    this.canvas = this.$refs['canvas'] as HTMLCanvasElement
    this.context = this.canvas.getContext('2d')!

    const bubbleUp = (evt: string) =>
      this.canvas.addEventListener(evt.toLowerCase(), (e) => this.$emit(evt, e))

    bubbleUp('mouseMove')
    bubbleUp('mouseDown')
    bubbleUp('mouseUp')
    bubbleUp('mouseOut')
    bubbleUp('keyDown')
    bubbleUp('keyUp')

    this.debugDraw = getCanvasDebugDraw()
    this.debugDraw.SetFlags(e_shapeBit)

    this.createWorld()
    this.createScene()
    this.resize()
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

  unregister(obj: GameObject) {
    console.log(obj)
    this.objects.push(obj)
  }

  register(obj: GameObject) {
    this.objects.filter((o) => o !== obj)
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
    this.context.fillStyle = 'rgb(0,0,0)'
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.context.save()
    this.context.translate(this.translate[0], this.translate[1])
    this.context.scale(1, -1)
    this.context.scale(32, 32)
    this.context.lineWidth /= 32

    drawAxes(this.context)
    this.context.fillStyle = 'rgb(255,255,0)'
    this.world.DrawDebugData()

    this.context.restore()
  }

  step() {
    var current = Date.now()
    this.world.Step(1 / 60, 3, 2)
    this.frametime = Date.now() - current
    this.frameTime60 = this.frameTime60 * (59 / 60) + this.frametime * (1 / 60)
  }

  update() {
    this.step()
    this.draw()

    requestAnimFrame(this.update.bind(this))
  }
  render(h: CreateElement) {
    return (
      <div>
        <canvas ref="canvas" width="800" height="650" />
        {this.$slots.default}
      </div>
    )
  }
}
