import { ProxyState } from "../AppState.js";
import { carsService } from "../Services/CarsService.js";

export class CarsController {
    constructor(){
        ProxyState.on('cars', this.drawCars)
        this.drawCars()
    }
    drawCars(){
        let template = ''
        ProxyState.cars.forEach(car =>{
            template += /*html */`
            <div class="col-lg-4 listing my-3">
                <div class="card">
                    <div> 
                        <img src="${car.img}" height="200" /> 
                    </div>
                    <div class="card-body">
                        <h4>
                            ${car.make} ${car.model}
                        </h4>
                            <h5>$${car.price}</h5>
                    </div>
                </div>
            </div>
            <button class="fab" onclick="app.carsController.toggleForm()">+</button>
            `
        })
        document.getElementById('listings').innerHTML = template
    }

    addCar(event){
        event.preventDefault()
        console.log(event)
        let form = event.target
        let formData = {
            make: form.make.value,
            model: form.model.value,
            price: form.price.value,
            color: form.color.value,
            img: form.img.value,
            miles: form.miles.value,
        }
        console.log(formData)
        carsService.addCar(formData)
        form.reset()
        this.toggleForm()
    }

    toggleForm(){
        document.getElementById('car-form').classList.toggle('d-none')
    }

}