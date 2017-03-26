import React from "react";
import RouteList from "./routelist";
import DestinationList from "./destinationlist";
import Display from "./display";
import StopList from "./stopslist";
import DirectionList from "./directionlist"
import GoogleMaps from "./google_maps";
import Predictions from "./predictions";
import InputStore from "../stores/InputStore";
import * as InputActions from "../actions/InputActions";
import MapStore from "../stores/MapStore";
import * as MapActions from "../actions/MapActions";

export default class Container extends React.Component {
  constructor(){
  	super();
  	this.getRouteList = this.getRouteList.bind(this);
  	this.getInput = this.getInput.bind(this);
    this.getDestinations = this.getDestinations.bind(this);
  	this.state = {
  		input: InputStore.inputDetails(),
      buses: MapStore.mapDetails(),
  		routelist: {},
      destinations: [],
      directions: [],
      selectedDestinations: [],
      stops: [],
      stop: "",
      stopId: "",
      predictions: [],
  	};
    window.state = this.state;
  }
  componentWillMount(){
    MapStore.on("change", this.getInput);
  	InputStore.on("change", this.getInput);

  }
  componentDidMount(){
    console.log("mounted");
	  this.getRouteList();
  }

  componentWillUnMount(){
    this.getRouteList().abort();
  	InputStore.removeListener("change", this.getInput);
    MapStore.removeListener("change", this.getInput);

  }
  getInput(){
  	this.setState({
  		input: InputStore.inputDetails(),
      buses: MapStore.mapDetails(),
  	})
  }
  getRouteList(){
  	const that = this;
  	return $.getJSON("/api/routes").done(function(data){
  		that.setState({routelist: data});
  	});
  }
  getDestinations(){
    const that = this;
    return $.getJSON("/api/"+this.state.input.route).done(function(data){
      InputActions.setDestinations(data);
    })
  }
  render(){
    return (
      <div class="row">
        <div class="col-lg-4 col-sm-12">
          <h3>Display</h3>
          <Display
            route={this.state.input.route}
            direction={this.state.input.direction}
            stop={this.state.input.stop}
            stopId={this.state.input.stopId}
            destination={this.state.input.selectedDestinations.join(",")} />
            <h3>Controls</h3>
            <h4>1st step pick a Route</h4>
          <RouteList
            routes={this.state.routelist}
            selected={this.state.input.route} />
            <h4>2nd step pick your destination(s)</h4>
   	      <DestinationList
            destinationlist={this.state.input.destinations} />
        </div>
        <div class="col-lg-8 col-sm-12">
          <GoogleMaps lat={41.878247} lng={-87.629767}
            route={this.state.input.route}
            destinations={this.state.input.selectedDestinations.join(",")}
            vehicles={this.state.buses.vehicles} />
        </div>
      </div>
      );
  }
}
