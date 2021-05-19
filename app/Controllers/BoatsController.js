import { ProxyState } from "../AppState.js";
import { boatsService } from "../Services/BoatsService.js";

export class BoatsController{
  constructor(){
    ProxyState.on('boats', this.drawBoats)
  }

  drawBoats(){
    let template = ''
        ProxyState.boats.forEach(boat => {
            template += /*html*/`
            <div class ="col-lg-4 listing my-3">
                <div class ="card">
                    <div class="card-img">
                        <img src="${boat.img}" height=200px/>
                    </div>
                    <div class ="card-body">
                        <h4>${boat.make} ${boat.model} - ${boat.type} type</h4>
                        <h5>$${boat.price}</h5>
                        <h5>${boat.length}'</h5>
                    </div>
                </div>
            </div>
            <button class="fab" onclick="app.boatsController.toggleForm()">+</button>
            `
        })
        document.getElementById("listings").innerHTML = template
  }

  addBoat(event){
    event.preventDefault()
    let form = event.target
    let formData = {
        make: form.make.value,
        model: form.model.value,
        type: form.type.value,
        length: form.length.value,
        price: form.price.value,
        img: form.img.value
    }

    boatsService.addBoat(formData)
    form.reset()
    this.toggleForm()
}

toggleForm(){
    document.getElementById("boat-form").classList.toggle("d-none")
}
}