import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class MapStore extends EventEmitter {
  constructor(){
    super()
    this.buses = {
      vehicles: {}
    }
  }
  mapDetails(){
    return this.buses;
  }
  getMap(){
    return this.buses;
  }
  setVehicles(vehicles){
    this.buses.vehicles = vehicles;
  }
  clearVehicles(){
    this.buses.vehicles = {}
  }
  handleActions(action){
    switch(action.type){
      case "SET_VEHICLES":{
        this.setVehicles(action.vehicles);
        this.emit("change");
        break;
      }
      case "CLEAR_VEHICLES":{
        this.clearVehicles(action.vehicles);
        this.emit("change");
        break;
      }
    }
  }
}
const mapStore = new MapStore;
dispatcher.register(mapStore.handleActions.bind(mapStore));
export default mapStore;