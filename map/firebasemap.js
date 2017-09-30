function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.8781, lng: -87.6298},
    zoom: 10,
    styles: [{
      featureType: 'poi',
      stylers: [{ visibility: 'off' }]  // Turn off points of interest.
    }, {
      featureType: 'transit.station',
      stylers: [{ visibility: 'off' }]  // Turn off bus stations, train stations, etc.
    }],
    disableDoubleClickZoom: true
  });
  var team = "team-15"
  var query = firebase.database().ref(team + "/map/locations");
  query.once("value").then(function(snapshot) {
      var geocoder = new google.maps.Geocoder();
      var locations = snapshot.val()
      for (i =0; i < locations.length; i++) {
          var lat_long = geocodeAddress(geocoder, locations[i].address, map);
          console.log(lat_long);
    }
});
}

function geocodeAddress(geocoder, address, map) {
    geocoder.geocode({'address' :address}, function(results, status){
      if (status === 'OK') {
          var marker = new google.maps.Marker({
              position: {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()},
              map: map});
        // return {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()};
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
}
