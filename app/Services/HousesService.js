import { ProxyState } from "../AppState.js"
import { House } from "../Models/House.js"


let url = 'http://localhost:3000/api/houses/'
class HousesService{
  async updateHouse(formData) {
    // @ts-ignore
    let res = await axios.put(url + formData.id, formData)

    let i = ProxyState.houses.findIndex(h => h.id == formData.id)
    ProxyState.houses.splice(i,1, new House(res.data))
    ProxyState.houses = ProxyState.houses
}
async deleteHouse(id) {
    // @ts-ignore
    await axios.delete(url + id)
    ProxyState.houses = ProxyState.houses.filter(h => h.id != id)
}

async getHouses(){
    // @ts-ignore
    let res = await axios.get(url)
    ProxyState.houses = res.data.map(h => new House(h))
}
  async addHouse(formData){
    // @ts-ignore
    let res = await axios.post(url, formData)
    let newHouse = new House(res.data)
    ProxyState.houses = [newHouse, ...ProxyState.houses]
}
}

export const housesService = new HousesService