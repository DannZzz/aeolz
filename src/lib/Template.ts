import Aeolz from "../index-types"
import { Global } from "./Global"
import { Utils } from "./Utils"

export type TemplateItem<T extends any = any> = {
  required?: boolean
  key: string
  type?: T
  default?: T
}

export type TemplateItemString<T extends any = any> = TemplateItem<T> | string

export type TypedTemplateItems<T extends readonly TemplateItem[]> = {
  [P in keyof T]: T[P] extends TemplateItem<infer U> ? U : never
}

export type TemplateOptions = {
  default?: any
  global?: boolean
  name?: keyof Aeolz.TemplateList
}

export class Template<
  T extends readonly TemplateItem[] = readonly TemplateItem[]
> {
  constructor(readonly items: T, public options: TemplateOptions = {}) {
    if (options.global) {
      if (!options.name) {
        Utils.createError("Template must have a name for registering globally")
      } else {
        Global.registerTemplate(this)
      }
    }
  }

  take(data: object): TypedTemplateItems<T> {
    const items: any = []
    for (let item of this.items) {
      if (!recursiveKeyExists(item.key, data)) {
        if (item.required) return null
        if ("default" in item) {
          items.push(item.default)
        } else if ("default" in this.options) {
          items.push(this.options.default)
        }
      } else {
        items.push(recursiveKey(item.key, data))
      }
    }
    return items
  }

  static items<T extends TemplateItem[]>(...items: T): Readonly<T> {
    return items
  }

  static useString(items: TemplateItemString[]): TemplateItem[] {
    return items.map((item) =>
      typeof item === "string" ? { key: item } : item
    )
  }
}

function recursiveKeyExists(key: string, obj: object) {
  const keyArr = key.split(".")
  if (keyArr.length === 0) return false
  let val: any = obj
  while (keyArr.length > 0) {
    const key = keyArr.shift()
    if (key in val) {
      val = val[key]
    } else {
      return false
    }
  }
  return true
}

function recursiveKey(key: string, obj: object) {
  const keyArr = key.split(".")
  let val: any = obj
  while (keyArr.length > 0) {
    const key = keyArr.shift()
    if (key in val) {
      val = val[key]
    } else {
      return undefined
    }
  }
  return val
}
