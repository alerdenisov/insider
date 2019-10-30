import { Vue, Component } from 'nuxt-property-decorator'
import { CreateElement } from 'vue'

@Component({
  name: 'p-game'
})
export default class GamePage extends Vue {
  world: any = null

  mounted() {
    this.world = new b2World(new b2Vec2(0.0, -10.0))
  }
  render(h: CreateElement) {
    return (
      <div>
        <svg />
      </div>
    )
  }
}
