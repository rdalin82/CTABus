

var map;
var markers = [];
function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:  41.878247, lng:  -87.629767 },
    zoom: 12
  });

  var infoWindow = new google.maps.InfoWindow({map: map});
  var pos;
  var userMarker;
  function handlePosition(position){
    pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    infoWindow.setPosition(pos);
    // infoWindow.setContent('you');
    infoWindow.close();
    userMarker = new google.maps.Marker ({
      position: pos,
      map: map,
      title: "Your Position",
      icon: '/man.png'
    });  
    map.panTo(pos);
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    infoWindow.setPosition(pos);
    // infoWindow.setContent('you');
    infoWindow.close();
    userMarker = new google.maps.Marker ({
      position: pos,
      map: map,
      title: "Your Position",
      icon: '/man.png'
    });    
    map.panTo(pos);
    } , function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
    navigator.geolocation.watchPosition(function(position){

      pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    infoWindow.setPosition(pos);
    // infoWindow.setContent('you');
    infoWindow.close();
    userMarker.setMap(null);
    userMarker = new google.maps.Marker ({
      position: pos,
      map: map,
      title: "Your Position",
      icon: '/man.png'
    });    
    map.panTo(pos);
    }, function(){
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  function path(){
    var str = window.location.pathname;
    return str.replace("map", "api");
  }
  currentPath = path();
  var promise = $.getJSON(currentPath)
  var veh = promise.done(function(data){
    v = {
      ids: [],
      lats: [],
      lons: []
    }
    for (y in data){
      v.ids.push(data[y]['vid']);
      v.lats.push(data[y]['lat']);
      v.lons.push(data[y]['lon']);  
    }
    var vehicles = v;
    for (var i = 0; i < vehicles.ids.length; i++) {
      var marker = new google.maps.Marker({
        position: { lat: vehicles.lats[i], lng: vehicles.lons[i] },
        map: map, 
        title: "bus"+vehicles.ids[i].toString(),
        icon: '/bus.png'
      });
      markers.push(marker);
    }
  })

  
  function drawOnMap(){
  
    $.getJSON(currentPath, function(data){
        markers = [];
        for (y in data){
          var target = data[y];
          var marker = new google.maps.Marker({
            position: { lat: target.lat, lng: target.lon }, 
            map: map, 
            title: "bus" + target.vid.toString(),
            icon: {
              url: '../bus.png'
            }
          });
          markers.push(marker)
        }
      });
      window.markers = markers;
    }
    function clearMarkers(){
      for (var i=0; i<markers.length; i++){
        markers[i].setMap(null);
      }
      markers = new Array();
    }
    setInterval(function(){
      clearMarkers();
        drawOnMap();
    }, 15000);
  }

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
}
