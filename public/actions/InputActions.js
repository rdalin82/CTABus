import dispatcher from "../dispatcher";
import inputApi from "../ApiUtils/InputApi";

export function setRoute(route){
	dispatcher.dispatch({
		type: "ROUTE",
		route,
	})
    inputApi.getDestinations(route).then(function(data){
    	dispatcher.dispatch({
		type: "SET_DESTINATIONS",
		destinations: data,
    })
  })
    inputApi.getDirections(route).then(function(data){
    	dispatcher.dispatch({
    		type:"GET_DIRECTIONS",
    		directions: data,
    	})
    })
}
export function updateRoute(route){
  dispatcher.dispatch({
    type:"ROUTE",
    route,
  })
}
export function updateDestination(destination){
	dispatcher.dispatch({
		type: "UPDATE_DESTINATION",
		destination: destination,
	})
}
export function addDestination(destination){
	dispatcher.dispatch({
		type: "ADD_DESTINATION",
		destination,
	});
}
export function removeDestination(destination){
	dispatcher.dispatch({
		type: "REMOVE_DESTINATION",
		destination,
	});
}
export function setDestinations(destinations){
	dispatcher.dispatch({
		type: "SET_DESTINATIONS",
		destinations,
	})
}

export function setDirection(direction, route){
	dispatcher.dispatch({
		type: "SET_DIRECTION",
		direction,
	})
	inputApi.getStops(direction, route).then(function(data){
		dispatcher.dispatch({
			type: "GET_STOPS",
			stops: data,
		})
	})
}
export function setStop(stop){
	dispatcher.dispatch({
		type:"SET_STOP",
		stop:stop,
	})
}
export function getPredictions(route, stop){
	dispatcher.dispatch({
		type:"GET_PREDICTIONS",
		prediction: prediction,
	})
}
