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
                        <img class="w-100" src="${house.imgUrl}" height=200px/>
                    </div>
                    <div class ="card-body">
                        <h5>$${house.price}</h5>
                        <h5>${house.levels} levels</h5>
                        <h5>${house.bedrooms} bedrooms</h5>
                        <h5>${house.bathrooms} bathrooms</h5>
                        <button class="btn btn-warning btn-block" onclick="app.housesController.editHouse('${house.id}')">EDIT House</button>
                        <button class="btn btn-danger btn-block" onclick="app.housesController.deleteHouse('${house.id}')">DELETE House</button>
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
        debugger
        try{
        let form = event.target
        let formData = {
            price: form.price.value,
            year: form.year.value,
            bedrooms: form.bedrooms.value,
            bathrooms: form.bathrooms.value,
            levels: form.levels.value,
            imgUrl: form.imgUrl.value
        }
        if(form.houseId.value){
            formData.id = form.houseId.value
            housesService.updateHouse(formData)
        }else{
            housesService.addHouse(formData)
        }
        form.reset()
        this.toggleForm()
    }catch(e){
        alert(e.message)
    }
    }

    editHouse(id){
        let house = ProxyState.houses.find(h => h.id == id)
        console.log("did it find the house?", house)
        let form = document.getElementById('house-form')
        form.bedrooms.value = house.bedrooms
        form.bathrooms.value = house.bathrooms
        form.year.value = house.year
        form.levels.value = house.levels
        form.price.value = house.price
        form.imgUrl.value = house.imgUrl
        form.houseId.value = house.id
    }

    getHouses(){
        housesService.getHouses()
    }

    deleteHouse(id){
        if(window.confirm("Are you sure you want to delete?")){
            housesService.deleteHouse(id)
        }
    }

    toggleForm(){
        document.getElementById("house-form").classList.toggle("d-none")
    }
}