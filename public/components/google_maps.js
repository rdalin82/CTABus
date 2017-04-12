import React from 'react';
import mapFunctions from "../MapUtils/mapUtils";
import {getVehicles, clearVehicles} from "../actions/MapActions";
import * as InputActions from "../actions/InputActions";


const mapStyle= {
  height: "80%",
  "marginLeft": "20px",
  "marginRight": "20px",
}

export default class GoogleMaps extends React.Component {
  constructor(){
    super()
    this.loaded= false
  }
  shouldComponentUpdate(prevProps){
    window.props = this.props
    window.prev = prevProps
    if(prevProps.route !== "Route" && prevProps.destinations !== ""){
      mapFunctions.clearMarkers()
      mapFunctions.drawVehicles(prevProps.vehicles, this.map)
    }
    else if (prevProps.route !== "Route" && prevProps.destinations === "" ){
      this.loaded = false;
      mapFunctions.clearMarkers()
    } else {

    }

    return false;
  }

  componentDidMount(){
    this.map = new google.maps.Map(this.refs.map, {
      center: {lat: this.props.lat, lng: this.props.lng },
      zoom: 12,
    })
    window.props = this.props
    mapFunctions.getDevicePosition(this.map);
    this.interval = setInterval(this.newVehicles.bind(this), 24000)

  }
  componentDidUnMount(){
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.destinations !== this.props.destinations){
      clearVehicles()
      getVehicles(nextProps.route, nextProps.destinations)
      mapFunctions.clearMarkers()
      mapFunctions.drawVehicles(nextProps.vehicles, this.map)
      this.loaded=false
    }
    if(this.props.route !== "Route" && this.props.destinations !== ""){
      if (!this.loaded){
        getVehicles(this.props.route, this.props.destinations)
        mapFunctions.clearMarkers()
        mapFunctions.drawVehicles(this.props.vehicles, this.map)
        this.loaded = true
      }
    }
  }
  newVehicles(){
    if(this.props.route !== "Route" && this.props.destinations !== ""){
      this.loaded = true
      getVehicles(this.props.route, this.props.destinations)
    }
  }

  render (){
    return(
        <div style={mapStyle} id="map" ref="map" />
      )
  }
}
