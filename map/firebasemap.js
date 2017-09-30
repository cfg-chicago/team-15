var firebase = new Firebase('link to firebase');

function initMap(team, month) {
  var map = new google.maps.Map(document.getElementById('map'), {
    var pins = []
    var query = firebase.database().ref(team + "map/locations");
    query.once("value").then(function(snapshot) {
        var locations = query.value
        for (i =0; i < locations.length; i++) {
            var object = JSON.parse(locations[i])
            var lat_long = geocoderAddress(geocoder, object.address))
            var marker = new google.maps.Marker({
                position: lat_long,
                map: map});
        }        
});
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
}

function makeInfoBox(controlDiv, map) {
    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.boxShadow = 'rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px';
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '2px';
    controlUI.style.marginBottom = '22px';
    controlUI.style.marginTop = '10px';
    controlUI.style.textAlign = 'center';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '100%';
    controlText.style.padding = '6px';
    controlText.innerText = 'The map shows all clicks made in the last 10 minutes.';
    controlUI.appendChild(controlText);
  }
  // Create the DIV to hold the control and call the makeInfoBox() constructor
  // passing in this DIV.
  // var infoBoxDiv = document.createElement('div');
  // var infoBox = new makeInfoBox(infoBoxDiv, map);
  // infoBoxDiv.index = 1;
  // map.controls[google.maps.ControlPosition.TOP_CENTER].push(infoBoxDiv);
