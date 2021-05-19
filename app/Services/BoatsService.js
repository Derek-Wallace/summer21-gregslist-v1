import { ProxyState } from "../AppState.js"
import { Boat } from "../Models/Boat.js"

class BoatsService{
  addBoat(formData){
    let newBoat = new Boat(formData.make, formData.model, formData.type, formData.price, formData.length, formData.img)
    ProxyState.boats.unshift(newBoat)
    ProxyState.boats = ProxyState.boats
  }
}

export const boatsService = new BoatsService