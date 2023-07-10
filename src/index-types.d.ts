import { Global as GlobalNamespace } from "./lib/Global"
import { TemplateItem } from "./lib/Template"

declare namespace Aeolz {
  export interface LoopList {
    [k: string]: Loop
  }
  export interface CacheList {
    [k: string]: CacheManager
  }
  export interface TemplateList {
    [k: string]: Template
  }

  export const Signal: typeof import("./lib/Signal").Signal
  export type Signal<T> = import("./lib/Signal").Signal<T>

  export const PureSignal: typeof import("./lib/PureSignal").PureSignal
  export type PureSignal<T> = import("./lib/PureSignal").PureSignal<T>

  export const Enumerable: typeof import("./lib/Decorators").Enumerable

  export import Global = GlobalNamespace

  export const CacheManager: typeof import("./lib/CacheManager").CacheManager
  export type CacheManager<T extends object = any> =
    import("./lib/CacheManager").CacheManager<T>

  export const Template: typeof import("./lib/Template").Template
  export type Template<
    T extends readonly TemplateItem<any>[] = readonly TemplateItem<any>[]
  > = import("./lib/Template").Template<T>

  export const Loop: typeof import("./lib/Loop").Loop
  export type Loop = import("./lib/Loop").Loop

  export const Tick: typeof import("./lib/Tick").Tick
  export type Tick = import("./lib/Tick").Tick
}

export default Aeolz
