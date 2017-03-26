class MapApi {
  getVehicles(route, destinations){
    return $.getJSON("api/"+route + "/" + destinations)
  }
}
const mapApi = new MapApi;
export default mapApi;