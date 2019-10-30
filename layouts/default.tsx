import { Vue, Component }  from "nuxt-property-decorator";
import { CreateElement } from "vue";

@Component
export default class DefaultLayout extends Vue {
  render(h: CreateElement) {
    return <div><nuxt /></div>
  }
}