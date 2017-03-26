class InputApi {
	getDestinations(route){
		return $.getJSON("/api/"+route);
	}
  getDirections(route){
    return $.getJSON("/api/directions/"+route);
  }
  getStops(direction, route){
    return $.getJSON("/api/stops/"+route+"/"+direction)
  }
	getPredictions(route, stopId){
		return $.getJson("/api/predictions/"+route+"/"+stopId)
	}
}
const inputApi = new InputApi;
export default inputApi
