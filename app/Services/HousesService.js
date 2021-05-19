import { ProxyState } from "../AppState.js"
import { House } from "../Models/House.js"

class HousesService{
  addHouse(formData){
    let newHouse = new House(formData.address, formData.city, formData.state, formData.price, formData.sqft, formData.stories, formData.img)
    ProxyState.houses.unshift(newHouse)
    ProxyState.houses = ProxyState.houses
  }
}

export const housesService = new HousesService