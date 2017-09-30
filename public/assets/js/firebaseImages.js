var kid = "0";
var query = firebase.database().ref('team-15/students/0/media');
query.once('value').then(function(snapshot){
	addStudentImages(snapshot.val());
});

var query2 = firebase.database().ref('team-15/media')
query2.once('value').then(function(snapshot){
	addTeamImages(snapshot.val())
})



function addStudentImages(images){
	for(var i = 0; i < images.length; i++){
		let x = document.createElement('img');
		x.setAttribute('src',images[i]);
		$('.my-photos')[0].appendChild(x);
	}
}

function addTeamImages(images){
	for(var i = 0; i < images.length; i++){
		let x = document.createElement('img');
		x.className = 'new-photo';
		x.setAttribute('src',images[i]);
		$('.choose-new-photos')[0].appendChild(x);
	}
	    $('.new-photo').click(function(e){
				console.log('clicked');
				const selected = e.target.getAttribute('selected');
				if(selected !== null){
					e.target.removeAttribute('selected')
				}
				else{
					e.target.setAttribute('selected',true)
				}
			});
}

function setStudentImages(){
	var selectedImages = [];
	var possibleImages = $('.new-photo');
	for(var i = 0; i < possibleImages.length; i++){
		if(possibleImages[i].getAttribute('selected')){
			selectedImages.push(possibleImages[i].getAttribute('src'));
		}
	}
	console.log(selectedImages);
	var ref = firebase.database().ref('team-15/students/0/media')
	.on('value',function(snapshot){
		var arr = snapshot.val().concat(selectedImages);
		console.log(arr);
		firebase.database().ref('team-15/students/0').child('media').set(arr);
	})
}