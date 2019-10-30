import { Vue, Component } from "nuxt-property-decorator";
import { CreateElement } from "vue";

@Component({
  name: "p-index"
})
export default class IndexPage extends Vue {
  mounted() {
    process.client
  }
  render(h: CreateElement) {
    return <div class="container">
      <div>
        <h1 class="title">Insider</h1>
      </div>
    </div>
  }
}