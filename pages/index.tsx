import { Vue, Component, Prop, Watch, PropSync } from 'nuxt-property-decorator'
import { CreateElement } from 'vue'
import { TsxComponent } from '~/types'
import Engine from '~/components/game/World'
import Handle from '~/components/game/Handle'
import Box from '~/components/game/Box'
import Player from '~/components/game/Player'
import Floor from '~/components/game/Floor'

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

  boxes: { id: string; w: number }[] = []
  current: number = Date.now()

  score: number = 0
  highscore: number = 0

  next: number = 0
  left: 1 | 0 = 0
  right: 1 | 0 = 0

  floorPtr: number = 0

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
        w: ~~(Math.random() * 300)
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
    console.log(evt.key, evt.keyCode)
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
    this.$nextTick(() => engine.resetScene())
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
          <Handle floorPtr={this.floorPtr} onCollide={this.end.bind(this)} />
          {this.boxes.map((box) => (
            <Box key={box.id} weight={box.w} />
          ))}
          <Player move={this.move} ref="player" />
          <Floor onBody={(ptr) => (this.floorPtr = ptr)} />
        </Engine>
      </div>
    )
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
