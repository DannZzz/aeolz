import { Global } from "./Global"

export class Utils {
  static isNumber(n: any): boolean {
    return typeof n === "number" && (!!n || n === 0)
  }

  static createError(msg: string) {
    if (Global.silence) return
    throw new Error(msg)
  }
}
