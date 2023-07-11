import Aeolz from "../index"

const UserTemplate = new Aeolz.Template<[string, string, string]>(
  [{ key: "name.real.name" }, { key: "name.real.password" }, { key: "email" }],
  { default: null }
)

// const a = UserTemplate.take()

console.log(UserTemplate.toObject(["Vardan", "1234", "vmaki@com"]))

Aeolz.Global.silence = true
// const loop = new Armory.Loop(null, { global: true, timeInSeconds: 10 })
