import { Boat } from "./Models/Boat.js"
import { Car } from "./Models/Car.js"
import { House } from "./Models/House.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

class AppState extends EventEmitter {

  /** @type {Car[]} */
  cars = [
    new Car("Honda", "Accord", 10000, "rusty", 500, "https://media.ed.edmunds-media.com/for-sale/62-1hgcv1f36ja009692/img-1-600x400.jpg")
  ]
  houses = [
    new House("144 S Wallace St", "Boise", "ID", 300000, 4000, 2, "https://cdn.houseplansservices.com/product/1hor8gqiu9vo20gap238r10nvp/w1024.jpg?v=17")
  ]

  boats = [
    new Boat("Malibu", "Wakesetter", "Wakeboard", 150000, "22", "https://i.pinimg.com/originals/04/4e/6a/044e6ac26d1a1c34a8efea902f874278.jpg")
  ]
}

export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
