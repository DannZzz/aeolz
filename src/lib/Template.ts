import Aeolz from "../index-types"
import { Global } from "./Global"
import { Utils } from "./Utils"

export type TemplateItem<T extends any = any> = {
  required?: boolean
  key: string
  default?: T
}

export type TemplateItemString<T extends any = any> = TemplateItem<T> | string

// export type TypedTemplateItems<T extends readonly TemplateItem[]> = {
//   [P in keyof T]: T[P] extends TemplateItem<infer U> ? U : never
// }

export type TemplateOptions = {
  default?: any
  requireAll?: boolean
  global?: boolean
  name?: keyof Aeolz.TemplateList
}

export class Template<I extends readonly any[] = readonly any[]> {
  constructor(
    readonly items: TemplateItem[],
    public options: TemplateOptions = {}
  ) {
    if (options.global) {
      if (!options.name) {
        Utils.createError("Template must have a name for registering globally")
      } else {
        Global.registerTemplate(this)
      }
    }
  }

  take(data: object): I {
    const items: any = []
    for (let item of this.items) {
      if (!recursiveKeyExists(item.key, data)) {
        if ("required" in item ? item.required : !!this.options.requireAll)
          return null
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

  /**
   * This method makes all items required
   */
  toObject<O extends object = object>(template: I): O {
    const object: object = {}
    if (!Array.isArray(template) || template.length > this.items.length)
      return object as O
    this.items.forEach((item, i) => {
      const itemData = template[i]
      assignValue(object, item.key, itemData)
    })
    return object as O
  }

  static useString(items: TemplateItemString[]): TemplateItem[] {
    return items.map((item) =>
      typeof item === "string" ? { key: item } : item
    )
  }
}

function assignValue(obj: object, key: string, value: any): void {
  const keys = key.split(".")
  const lastKey = keys.pop()

  keys.reduce((nestedObj, nestedKey) => {
    if (!nestedObj[nestedKey]) {
      nestedObj[nestedKey] = {}
    }
    return nestedObj[nestedKey]
  }, obj)[lastKey] = value
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
