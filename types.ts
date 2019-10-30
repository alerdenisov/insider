import { Vue } from 'nuxt-property-decorator'

export abstract class TsxComponent<P> extends Vue {
  private vueTsxProps!: JSX.Props<P>
}
