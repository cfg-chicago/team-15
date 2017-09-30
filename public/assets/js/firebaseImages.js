var kid = "0";
var query = firebase.database().ref('team-15/students/0/media');
query.once('value').then(function(snapshot){
	addStudentImages(snapshot.val());
});



function addStudentImages(images){
	for(var i = 0; i < images.length; i++){
		let x = document.createElement('img');
		x.setAttribute('src',images[i]);
		$('.my-photos')[0].appendChild(x);
	}
}