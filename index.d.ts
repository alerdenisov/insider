import * as CSS from 'csstype'

declare global {
  interface INuxtContext {
    app: vue.default;
    isClient: boolean;
    isServer: boolean;
    isStatic: boolean;
    isDev: boolean;
    isHMR: boolean;
    route: Route;
    store: Store<any>;
    env: object;
    query: object;
    nuxtState: object;
    req: Request;
    res: Response;
    redirect: (path: string) => void;
    error: (params: { statusCode?: string; message?: string }) => void;
    beforeNuxtRender: ({ Components, nuxtState }) => void;
  }

  namespace JSX {
    interface ElementAttributesProperty {
      vueTsxProps: any;
    }
    
    interface VueElementEventMap {
      onFullscreenchange: Event;
      nativeOnFullscreenchange: Event;
      onFullscreenerror: Event;
      nativeOnFullscreenerror: Event;
      onAbort: UIEvent;
      nativeOnAbort: UIEvent;
      onAnimationcancel: AnimationEvent;
      nativeOnAnimationcancel: AnimationEvent;
      onAnimationend: AnimationEvent;
      nativeOnAnimationend: AnimationEvent;
      onAnimationiteration: AnimationEvent;
      nativeOnAnimationiteration: AnimationEvent;
      onAnimationstart: AnimationEvent;
      nativeOnAnimationstart: AnimationEvent;
      onAuxclick: MouseEvent;
      nativeOnAuxclick: MouseEvent;
      onBlur: FocusEvent;
      nativeOnBlur: FocusEvent;
      onCancel: Event;
      nativeOnCancel: Event;
      onCanplay: Event;
      nativeOnCanplay: Event;
      onCanplaythrough: Event;
      nativeOnCanplaythrough: Event;
      onChange: Event;
      nativeOnChange: Event;
      onClick: MouseEvent;
      nativeOnClick: MouseEvent;
      onClose: Event;
      nativeOnClose: Event;
      onContextmenu: MouseEvent;
      nativeOnContextmenu: MouseEvent;
      onCuechange: Event;
      nativeOnCuechange: Event;
      onDblclick: MouseEvent;
      nativeOnDblclick: MouseEvent;
      onDrag: DragEvent;
      nativeOnDrag: DragEvent;
      onDragend: DragEvent;
      nativeOnDragend: DragEvent;
      onDragenter: DragEvent;
      nativeOnDragenter: DragEvent;
      onDragexit: Event;
      nativeOnDragexit: Event;
      onDragleave: DragEvent;
      nativeOnDragleave: DragEvent;
      onDragover: DragEvent;
      nativeOnDragover: DragEvent;
      onDragstart: DragEvent;
      nativeOnDragstart: DragEvent;
      onDrop: DragEvent;
      nativeOnDrop: DragEvent;
      onDurationchange: Event;
      nativeOnDurationchange: Event;
      onEmptied: Event;
      nativeOnEmptied: Event;
      onEnded: Event;
      nativeOnEnded: Event;
      onError: ErrorEvent;
      nativeOnError: ErrorEvent;
      onFocus: FocusEvent;
      nativeOnFocus: FocusEvent;
      onGotpointercapture: PointerEvent;
      nativeOnGotpointercapture: PointerEvent;
      onInput: Event;
      nativeOnInput: Event;
      onInvalid: Event;
      nativeOnInvalid: Event;
      onKeydown: KeyboardEvent;
      nativeOnKeydown: KeyboardEvent;
      onKeypress: KeyboardEvent;
      nativeOnKeypress: KeyboardEvent;
      onKeyup: KeyboardEvent;
      nativeOnKeyup: KeyboardEvent;
      onLoad: Event;
      nativeOnLoad: Event;
      onLoadeddata: Event;
      nativeOnLoadeddata: Event;
      onLoadedmetadata: Event;
      nativeOnLoadedmetadata: Event;
      onLoadend: ProgressEvent;
      nativeOnLoadend: ProgressEvent;
      onLoadstart: Event;
      nativeOnLoadstart: Event;
      onLostpointercapture: PointerEvent;
      nativeOnLostpointercapture: PointerEvent;
      onMousedown: MouseEvent;
      nativeOnMousedown: MouseEvent;
      onMouseenter: MouseEvent;
      nativeOnMouseenter: MouseEvent;
      onMouseleave: MouseEvent;
      nativeOnMouseleave: MouseEvent;
      onMousemove: MouseEvent;
      nativeOnMousemove: MouseEvent;
      onMouseout: MouseEvent;
      nativeOnMouseout: MouseEvent;
      onMouseover: MouseEvent;
      nativeOnMouseover: MouseEvent;
      onMouseup: MouseEvent;
      nativeOnMouseup: MouseEvent;
      onPause: Event;
      nativeOnPause: Event;
      onPlay: Event;
      nativeOnPlay: Event;
      onPlaying: Event;
      nativeOnPlaying: Event;
      onPointercancel: PointerEvent;
      nativeOnPointercancel: PointerEvent;
      onPointerdown: PointerEvent;
      nativeOnPointerdown: PointerEvent;
      onPointerenter: PointerEvent;
      nativeOnPointerenter: PointerEvent;
      onPointerleave: PointerEvent;
      nativeOnPointerleave: PointerEvent;
      onPointermove: PointerEvent;
      nativeOnPointermove: PointerEvent;
      onPointerout: PointerEvent;
      nativeOnPointerout: PointerEvent;
      onPointerover: PointerEvent;
      nativeOnPointerover: PointerEvent;
      onPointerup: PointerEvent;
      nativeOnPointerup: PointerEvent;
      onProgress: ProgressEvent;
      nativeOnProgress: ProgressEvent;
      onRatechange: Event;
      nativeOnRatechange: Event;
      onReset: Event;
      nativeOnReset: Event;
      onResize: UIEvent;
      nativeOnResize: UIEvent;
      onScroll: Event;
      nativeOnScroll: Event;
      onSecuritypolicyviolation: SecurityPolicyViolationEvent;
      nativeOnSecuritypolicyviolation: SecurityPolicyViolationEvent;
      onSeeked: Event;
      nativeOnSeeked: Event;
      onSeeking: Event;
      nativeOnSeeking: Event;
      onSelect: Event;
      nativeOnSelect: Event;
      onSelectionchange: Event;
      nativeOnSelectionchange: Event;
      onSelectstart: Event;
      nativeOnSelectstart: Event;
      onStalled: Event;
      nativeOnStalled: Event;
      onSubmit: Event;
      nativeOnSubmit: Event;
      onSuspend: Event;
      nativeOnSuspend: Event;
      onTimeupdate: Event;
      nativeOnTimeupdate: Event;
      onToggle: Event;
      nativeOnToggle: Event;
      onTouchcancel: TouchEvent;
      nativeOnTouchcancel: TouchEvent;
      onTouchend: TouchEvent;
      nativeOnTouchend: TouchEvent;
      onTouchmove: TouchEvent;
      nativeOnTouchmove: TouchEvent;
      onTouchstart: TouchEvent;
      nativeOnTouchstart: TouchEvent;
      onTransitioncancel: TransitionEvent;
      nativeOnTransitioncancel: TransitionEvent;
      onTransitionend: TransitionEvent;
      nativeOnTransitionend: TransitionEvent;
      onTransitionrun: TransitionEvent;
      nativeOnTransitionrun: TransitionEvent;
      onTransitionstart: TransitionEvent;
      nativeOnTransitionstart: TransitionEvent;
      onVolumechange: Event;
      nativeOnVolumechange: Event;
      onWaiting: Event;
      nativeOnWaiting: Event;
      onWheel: WheelEvent;
      nativeOnWheel: WheelEvent;
      onCopy: ClipboardEvent;
      nativeOnCopy: ClipboardEvent;
      onCut: ClipboardEvent;
      nativeOnCut: ClipboardEvent;
      onPaste: ClipboardEvent;
      nativeOnPaste: ClipboardEvent;
    }

    type D = Map<VueElementEventMap, EventMapFunc>;
    type DefaultEvents =
      | {
          [event in keyof VueElementEventMap]: (
            evt: VueElementEventMap[event]
          ) => void | Promise<void>;
        }
      | {
          on: {
            [event in keyof HTMLElementEventMap]: (
              evt: HTMLElementEventMap[event]
            ) => void | Promise<void>;
          };
          nativeOn: {
            [event in keyof HTMLElementEventMap]: (
              evt: HTMLElementEventMap[event]
            ) => void | Promise<void>;
          };
        };

    type DeepPartial<T> = { [P in keyof T]?: T[P] | DeepPartial<T[P]> };
    type DefaultProps = DeepPartial<
      DefaultEvents & {
        attrs: any;
        props: any;
        directives: Array<{
          name: string;
          arg?: string;
          modifiers?: { [key: string]: boolean | string };
        }>;
        class: string | { [key: string]: boolean };
        id: string;
        style: string | CSS.Properties;
        key: string;
        ref: string;
        refInFor: string;
        slot: string;
        "v-model": any;
        vModel: any;
      }
    >;

    type Props<P> = Readonly<DefaultProps & P>;
  }
  
  declare namespace NodeJS {
    interface Process {
      client: boolean;
      server: boolean;
    }
  }
}


declare module "vue/types/vue" {
  type Mods = { [key: string]: boolean | string };

  interface Vue {
    i18n: i18n.IVueI18n | i18n.default;
    $bem(
      elOrMods?: string | Mods,
      mods?: Mods
    ): {
      directives: Array<{
        name: "bem";
        arg?: string;
        modifiers?: { [key: string]: boolean };
      }>;
    };
    $api<TChain extends keyof typeof chainsMap>(
      type: TChain
    ): Promise<Api<TChain>>;
    range<T = any>(n: number, func: (index: number) => T): T[];
  }
}
