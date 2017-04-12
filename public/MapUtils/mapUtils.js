class MapFunctions{
  constructor(){
    this.markers = []
  }
  handlePosition(position){
    pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    infoWindow.setPosition(pos);
    // infoWindow.setContent('you');
    infoWindow.close();
    var userMarker = new google.maps.Marker ({
      position: pos,
      map: map,
      title: "Your Position",
      icon: '../images/man.png'
    });
    map.panTo(pos);
  }

  getDevicePosition(map){
    var infoWindow = new google.maps.InfoWindow({map: map});
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position){

      var pos;
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      window.pos = pos;
      infoWindow.setPosition(pos);
      // infoWindow.setContent('you');
      infoWindow.close();
      // userMarker.setMap(null);
      var userMarker;
      userMarker = new google.maps.Marker ({
        position: pos,
        map: map,
        title: "Your Position",
        icon: '../images/man.png'
      });
      map.panTo(pos);
      }, function(){
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  drawVehicles(vehicles, map){
      for (var y in vehicles){
        var target = vehicles[y];
        var marker = new google.maps.Marker({
          position: { lat: target.lat, lng: target.lon },
          map: map,
          title: "bus" + target.vid.toString(),
          icon: {
            url: '../images/bus.png'
          }
        });
        this.markers.push(marker);
      }
      window.markers = this.markers;
    }
    clearMarkers(){
      for (var i=0; i<this.markers.length; i++){
        this.markers[i].setMap(null);
      }
      this.markers = new Array();
    }
  }

const mapFunctions = new MapFunctions;
export default mapFunctions;
