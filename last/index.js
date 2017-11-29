var map;
var infowindow;
function initMap() {
  var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    
    
      var here= {lat: latitude, lng: longitude};
        map = new google.maps.Map(document.getElementById('map'), {
          center:here,
          zoom: 15
        });
        
        var userMarker = new google.maps.Marker({
                position: {lat: position.coords.latitude, lng: position.coords.longitude},
                map: map,
                title: 'Current Position'
              });
      infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: here,
    radius: 500,
    type: ['restaurant'],
    keyword:['Mexican']
  }, callback);
  }

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  

  navigator.geolocation.getCurrentPosition(success, error);
  
  function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
 
}