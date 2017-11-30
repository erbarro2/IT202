$('#Search').show();
var map;
var infowindow;
function initMap() {
  var choice = $('#inspectSearch').val();
  var inspectRadius = $('#radius').val();
  $('#Search').hide();
  $('#map').show();
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
    radius:[inspectRadius],
    type: ['restaurant'],
    keyword:[choice]
  }, callback);
    var db = new Dexie('LunchspotDB');
        	// Define a schema
        	db.version(1).stores({
        		favorites: '++id, name, address, rating'
        	});
    
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
  function addFavorite(name, address, rating)
         {
           alert("Added to favorites");
           console.log(name);
           console.log(address);
           console.log(rating);
        
          db.favorites.add({
        		name: name,
        		address: address,
        		rating: rating
        	});
         }
 
}
if ('serviceWorker' in navigator) {
        console.log("Will the service worker register?");
        navigator.serviceWorker.register('service-worker.js')
          .then(function(reg){
            console.log("Yes, it did.");
          }).catch(function(err) {
            console.log("No it didn't. This happened: ", err);
          });
      }



