import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class InputStore extends EventEmitter {
	constructor(){
		super()
		this.request = {
			route: "Route",
			destinations: [],
			selectedDestinations: [],
			directions: [],
			direction: "",
			stops: [],
			stop: "",
			stopId: "",
			predictions:[],
		}
	}
	resetState(){
		this.request = {
			route: "Route",
			destinations: [],
			selectedDestinations: [],
			directions: [],
			direction: "",
			stops: [],
			stop: "",
			stopId: "",
			predictions:[],
		}
	}
	inputDetails(){
		return this.request;
	}
	setRoute(route){
		this.resetState();
		this.request.route=route;
	}
	updateDestination(dest){
		const destination = dest.key;
		if (this.request.selectedDestinations.includes(destination)) {
			this.removeDestination(destination);
		} else {
			this.addDestination(destination);
		}
	}
	addDestination(destination){
		this.request.selectedDestinations.push(destination);
	}
	removeDestination(destination){
		this.request.selectedDestinations = this.request.selectedDestinations.filter(function(item){
			return item !== destination;
		});
	}
	setDestinations(destinations){
		this.request.destinations = destinations;
	}
	getDirections(directions){
		this.request.directions = directions;
	}
	setDirection(direction){
		this.request.direction = direction;
	}
	getStops(stops){
		this.request.stops = stops;
	}
	setStop(stop){
		this.request.stop = stop.stopName;
		this.request.stopId = stop.stopId;
	}

	handleActions(action){
		switch(action.type){
			case "ROUTE":{
				this.setRoute(action.route);
				this.emit("change");
				break;
			}
			case "ADD_DESTINATION":{
				this.addDestination(action.destination);
				this.emit("change");
				break;
			}
			case "REMOVE_DESTINATION":{
				this.removeDestination(action.destination);
				this.emit("change");
				break;
			}
			case "UPDATE_DESTINATION":{
				this.updateDestination(action.destination);
				this.emit("change");
				break;
			}
			case "SET_DESTINATIONS":{
				this.setDestinations(action.destinations);
				this.emit("change");
				break;
			}
			case "GET_STOPS":{
				this.getStops(action.stops);
				this.emit("change");
				break;
			}
			case "SET_STOP":{
				this.setStop(action.stop);
				this.emit("change");
				break;
			}
			case "GET_DIRECTIONS":{
				this.getDirections(action.directions);
				this.emit("change");
				break;
			}
			case "SET_DIRECTION":{
				this.setDirection(action.direction);
				this.emit("change");
				break;
			}
		}
	}
}
const inputStore = new InputStore;
dispatcher.register(inputStore.handleActions.bind(inputStore));
export default inputStore;
