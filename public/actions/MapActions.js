import dispatcher from "../dispatcher";
import mapApi from "../ApiUtils/MapApi";

export function getVehicles(route, destination){
  mapApi.getVehicles(route, destination).then(function(vehicles){
    dispatcher.dispatch({
      type: "SET_VEHICLES",
      vehicles, 
    })
  })
}
export function clearVehicles(){
  dispatcher.dispatch({
    type:"CLEAR_VEHICLES",
  })
}
