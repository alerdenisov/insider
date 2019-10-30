import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
import { CreateElement } from 'vue'
import { TsxComponent } from '~/types'
import World from '~/components/game/World'

@Component({
  name: 'p-game'
})
export default class Game extends Vue {
  worldSize: { x: number; y: number } = { x: 0, y: 0 }

  mounted() {
    this.resize()
    window.addEventListener('resize', this.resize.bind(this))
  }

  resize() {
    this.worldSize.x = document.documentElement.clientWidth
    this.worldSize.y = document.documentElement.clientHeight
  }

  render(h: CreateElement) {
    return (
      <div>
        <World width={this.worldSize.x} height={this.worldSize.y}>
          <span>test</span>
        </World>
      </div>
    )
  }
}
