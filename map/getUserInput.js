  /**
 * Data object to be written to Firebase.
 */

var data = {
  name: null,
  timestamp: null,
  address: null
};


function getNameAddress(){
	name = document.getElementById("tripName");
	date = document.getElementById("date")
	address = 

}

/**
 * Adds a click to firebase.
 * @param {Object} data The data to be added to firebase.
 *     It contains the lat, lng, sender and timestamp.
 */
function addToFirebase() {
	var data = getNameAddress()
	var ref = firebase.child('map').push(data, function(err) {
	 if (err) {  // Data was not written to firebase.
	   console.log(err);
	 }
});
