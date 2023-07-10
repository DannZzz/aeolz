import { CacheManager } from "./lib/CacheManager"
import { Enumerable } from "./lib/Decorators"
import { Global } from "./lib/Global"
import { Loop } from "./lib/Loop"
import { PureSignal } from "./lib/PureSignal"
import { Signal } from "./lib/Signal"
import { Template } from "./lib/Template"
import { Tick } from "./lib/Tick"

const Aeolz = {
  Signal: Signal,
  PureSignal: PureSignal,
  Enumerable: Enumerable,
  Global: Global,
  CacheManager: CacheManager,
  Template: Template,
  Loop: Loop,
  Tick: Tick,
}

export default Aeolz
