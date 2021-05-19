import { BoatsController } from "./Controllers/BoatsController.js";
import { CarsController } from "./Controllers/CarsController.js"
import { HousesController } from "./Controllers/HousesController.js";
class App {

  // constructor(){
  //   this.carsController = new CarsController()
  // }

  carsController = new CarsController()
  housesController = new HousesController()

  boatsController = new BoatsController()

}


window["app"] = new App()