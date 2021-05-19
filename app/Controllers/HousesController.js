import { ProxyState } from "../AppState.js";
import { housesService } from "../Services/HousesService.js";

export class HousesController{
    constructor(){
        ProxyState.on('houses', this.drawHouses)
    }

    drawHouses(){
        let template = ''
        ProxyState.houses.forEach(house => {
            template += /*html*/`
            <div class ="col-lg-4 listing my-3">
                <div class ="card">
                    <div class="card-img">
                        <img src="${house.img}" height=200px/>
                    </div>
                    <div class ="card-body">
                        <h4>${house.address} ${house.city}, ${house.state}</h4>
                        <h5>$${house.price}</h5>
                        <h5>${house.sqft}sqft - ${house.stories} stories</h5>
                    </div>
                </div>
            </div>
            <button class="fab" onclick="app.housesController.toggleForm()">+</button>
            `
        })
        document.getElementById("listings").innerHTML = template
        document.getElementById("car-form").classList.add("d-none")
        document.getElementById("house-form").classList.add("d-none")
        document.getElementById("boat-form").classList.add("d-none")
    }

    addHouse(event){
        event.preventDefault()
        let form = event.target
        let formData = {
            address: form.address.value,
            city: form.city.value,
            state: form.state.value,
            price: form.price.value,
            sqft: form.sqft.value,
            stories: form.stories.value,
            img: form.img.value
        }

        housesService.addHouse(formData)
        form.reset()
        this.toggleForm()
    }

    toggleForm(){
        document.getElementById("house-form").classList.toggle("d-none")
    }
}