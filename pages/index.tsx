import { Vue, Component, Prop, Watch, PropSync } from 'nuxt-property-decorator'
import { CreateElement } from 'vue'
import { TsxComponent } from '~/types'
import Engine from '~/components/game/World'
import Handle from '~/components/game/Handle'
import Box from '~/components/game/Box'
import Player from '~/components/game/Player'
import Floor from '~/components/game/Floor'
import PhysicObject from '~/components/game/PhysicObject'
import GameObject from '~/components/game/GameObject'

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

enum Keys {
  Space = 32,
  Left = 37,
  Right = 39
}

@Component({
  name: 'p-game'
})
export default class Game extends Vue {
  worldSize: { x: number; y: number } = { x: 0, y: 0 }

  boxes: { id: string; w: number; x: number; y: number; go?: Box }[] = []
  current: number = Date.now()

  score: number = 0
  highscore: number = 0

  next: number = 0
  left: 1 | 0 = 0
  right: 1 | 0 = 0

  clear = false
  handleBody: any = null

  handleFloorContact(body) {
    if (body.ptr === this.handleBody.ptr) {
      this.end()
    }

    for (let index = 0; index < this.boxes.length; index++) {
      const box = this.boxes[index]
      if (typeof box.go !== 'undefined' && typeof box.go.body !== 'undefined') {
        if (box.go.body.ptr === body.ptr) {
          console.log(box, box.go!.body!.ptr, body.ptr)
          this.boxes.splice(index, 1)
          index--
        }
      }
    }
  }

  get move(): -1 | 0 | 1 {
    return (-this.left + this.right) as any
  }

  mounted() {
    window.addEventListener('keydown', this.onPress.bind(this))
    window.addEventListener('keyup', this.onRelease.bind(this))

    this.resize()
    window.addEventListener('resize', this.resize.bind(this))

    this.update()
  }

  update() {
    const dt = Math.min(1000 / 60, Date.now() - this.current)
    this.score += dt
    this.current = Date.now()
    const engine = this.$refs.engine as Engine
    engine.update(dt)

    if (this.next <= 0) {
      this.boxes.push({
        id: Math.random()
          .toString(32)
          .substr(2),
        x: (1 - Math.random() * 2) * 16,
        y: 15 + Math.random() * 10,
        w: 1 + ~~(Math.random() * 10)
      })

      this.next = 1500 + Math.random() * 500
    }

    this.next -= dt

    requestAnimFrame(this.update.bind(this))
  }

  resize() {
    this.worldSize.x = document.documentElement.clientWidth
    this.worldSize.y = document.documentElement.clientHeight
  }

  onRelease(evt: KeyboardEvent) {
    switch (evt.keyCode) {
      case Keys.Left:
        this.left = 0
        break
      case Keys.Right:
        this.right = 0
        break
    }
  }

  onPress(evt: KeyboardEvent) {
    switch (evt.keyCode) {
      case Keys.Left:
        this.left = 1
        break
      case Keys.Right:
        this.right = 1
        break
    }
  }

  end() {
    if (this.highscore < this.score) this.highscore = this.score

    this.score = 0
    const engine = this.$refs.engine as Engine
    this.boxes.splice(0, this.boxes.length)

    this.clear = true
    this.$nextTick(() => (this.clear = false)) //engine.resetScene())
  }

  get view() {
    let x = 0
    let y = this.worldSize.y * 0.4
    return { x, y }
  }

  get zoom() {
    const w = this.worldSize.x / 50
    const h = this.worldSize.y / 35
    return Math.min(w, h)
  }

  render(h: CreateElement) {
    return (
      <div {...this.$bem()}>
        <Scoreboard
          {...this.$bem('scoreboard')}
          score={this.score}
          highscore={this.highscore}
        />
        <Engine
          width={this.worldSize.x}
          height={this.worldSize.y}
          ref="engine"
          zoom={this.zoom}
          view={this.view}
        >
          {!this.clear && [
            <Handle
              width={16}
              height={0.4}
              y={4}
              active
              awake
              density={5}
              linearDamping={2}
              angularDamping={2}
              onEnable={(go) => (this.handleBody = (go as PhysicObject).body)}
            />,
            ...this.boxes.map((box) => (
              <Box
                key={box.id}
                weight={box.w}
                x={box.x}
                y={box.y}
                linearDamping={0.5}
                density={0.7}
                onEnable={this.injectBox(box.id).bind(this)}
              />
            )),
            <Player
              move={this.move}
              ref="player"
              density={5}
              linearDamping={10}
              angularDamping={10}
              r={180}
              awake
              active
            />,
            <Floor
              listen
              active={true}
              awake={false}
              density={0}
              x={0}
              y={0}
              onCollisionEnter={this.handleFloorContact.bind(this)}
            />
          ]}
        </Engine>
      </div>
    )
  }

  injectBox(id: string) {
    return (b) => {
      const index = this.boxes.findIndex((b) => b.id === id)
      if (index >= 0) {
        this.$set(this.boxes, index, { ...this.boxes[index], go: b })
      }
    }
  }
}

export interface ScoreboardProps {
  score: number
  highscore: number
}
@Component({
  name: 'e-scoreboard'
})
export class Scoreboard extends TsxComponent<ScoreboardProps>
  implements ScoreboardProps {
  @Prop({ required: true })
  score!: number
  @Prop({ required: true })
  highscore!: number

  get displayHighscore() {
    return ~~(this.highscore / 100)
  }

  get displayScore() {
    return ~~(this.score / 100)
  }

  render(h: CreateElement) {
    return (
      <div {...this.$bem()}>
        <span {...this.$bem('current')}>{this.displayScore}</span>
        {this.displayHighscore && (
          <span {...this.$bem('highscore')}>{this.displayHighscore}</span>
        )}
      </div>
    )
  }
}
