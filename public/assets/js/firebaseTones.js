function getTones(){
	var ref1 = firebase.database().ref("team-15/students/0/journals");
	var ref2 = firebase.database().ref("team-15/students/1/journals");
	var ref3 = firebase.database().ref("team-15/students/2/journals");
	ref1.once('value',function(snapshot){
		var x = snapshot.val();
		console.log(x)
		$("#tone1")[0].innerHTML = x[x.length-1].tones[0].score + x[x.length-1].tones[0].tone_name
	});
	ref2.once('value',function(snapshot){
		var x = snapshot.val();
		console.log(x)
		$("#tone2")[0].innerHTML = x[x.length-1].tones[0].score + x[x.length-1].tones[0].tone_name
	});
	ref3.once('value',function(snapshot){
		var x = snapshot.val();
		console.log(x)
		$("#tone3")[0].innerHTML = x[x.length-1].tones[0].score + x[x.length-1].tones[0].tone_name
	});
}
getTones()
