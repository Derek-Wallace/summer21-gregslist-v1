import { ProxyState } from "../AppState.js";
import { Car } from "../Models/Car.js";


let url = 'https://bcw-sandbox.herokuapp.com/api/cars/'
class CarsService{

    async updateCar(formData) {
        // @ts-ignore
        let res = await axios.put(url + formData.id, formData)

        let indexOfCarToBeUpdated = ProxyState.cars.findIndex(c => c.id == formData.id)
        ProxyState.cars.splice(indexOfCarToBeUpdated,1, new Car(res.data))
        ProxyState.cars = ProxyState.cars
    }
    async deleteCar(id) {
        // @ts-ignore
        await axios.delete(url + id)
        ProxyState.cars = ProxyState.cars.filter(c => c.id != id)
    }

    async getCars(){
        // @ts-ignore
        let res = await axios.get(url)
        ProxyState.cars = res.data.map(c => new Car(c))
    }

    async addCar(formData){
        // @ts-ignore
        let res = await axios.post(url, formData)
        let newCar = new Car(res.data)
        ProxyState.cars = [newCar, ...ProxyState.cars]
    }
}

// NOTE singleton
export const carsService = new CarsService()