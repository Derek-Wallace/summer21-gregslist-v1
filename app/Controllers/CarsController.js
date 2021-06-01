import { ProxyState } from "../AppState.js";
import { carsService } from "../Services/CarsService.js";

export class CarsController {
    constructor(){
        ProxyState.on('cars', this.drawCars)
        carsService.getCars()
        this.drawCars()
    }
    drawCars(){
        let template = ''
        ProxyState.cars.forEach(car =>{
            template += /*html */`
            <div class="col-lg-4 listing my-3">
                <div class="card">
                    <div> 
                        <img class="w-100" src="${car.img}" height="200" /> 
                    </div>
                    <div class="card-body">
                        <h4>
                            ${car.make} ${car.model}
                        </h4>
                            <h5>$${car.price}</h5>
                            <button class="btn btn-warning btn-block" onclick="app.carsController.editCar('${car.id}')">EDIT CAR</button>
                            <button class="btn btn-danger btn-block" onclick="app.carsController.deleteCar('${car.id}')">DELETE CAR</button>
                    </div>
                </div>
            </div>
            <button class="fab" onclick="app.carsController.toggleForm()">+</button>
            `
        })
        document.getElementById('listings').innerHTML = template
        document.getElementById("car-form").classList.add("d-none")
        document.getElementById("house-form").classList.add("d-none")
        document.getElementById("boat-form").classList.add("d-none")
    }

    addCar(event){
        event.preventDefault()
        try{
            event.preventDefault()
            let form = event.target
            let formData = {
                make: form.make.value,
                model: form.model.value,
                year: form.year.value,
                price: form.price.value,
                img: form.img.value,
            }
            if(form.carId.value){
                formData.id = form.carId.value
                carsService.updateCar(formData)
            }else{
                carsService.addCar(formData)
            }
            form.reset()
            this.toggleForm()
        }catch(e){
            console.error(e.message)
    }
    }

    deleteCar(id){
        try {
            if(window.confirm("are you sure this is not reversiable")){
                carsService.deleteCar(id)
            }
        } catch (e) {
            console.error(e.message)
        }
    }

    editCar(id){
        this.toggleForm()
        let car = ProxyState.cars.find(c => c.id == id)
        let form = document.getElementById('car-form')
        form.make.value = car.make
        form.model.value = car.model
        form.year.value = car.year
        form.price.value = car.price
        form.img.value = car.img
        form.carId.value = car.id
    }
    toggleForm(){
        document.getElementById('car-form').classList.toggle('d-none')
        
    }

}