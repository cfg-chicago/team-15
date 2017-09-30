function saveJournal(){
	console.log('hero');
	var dateObj = new Date();
	var month = dateObj.getUTCMonth() + 1; //months from 1-12
	var day = dateObj.getUTCDate();
	var year = dateObj.getUTCFullYear();

	var journalText = $("#journalEntry")[0].value;
	if(!journalText){
		return;
	}
	var ref = firebase.database().ref("team-15/students/0/journals");

		ref.once('value',function(snapshot){
			var oldArr = snapshot.val()
			oldArr.push({
				date: year+"-"+month+"-"+day,
				entry: journalText
			})
			ref.set(oldArr);
		});
}

function getJournals(){
	var ref = firebase.database().ref('team-15/students/0/journals');
	ref.once('value',function(snapshot){
		console.log(snapshot.val());
		var entries = snapshot.val()
		for(var i = 0; i < entries.length; i++){
			var el = document.createElement('p');
			console.log(entries[i]);
			el.innerHTML = entries[i].entry;
			$("#existingEntries")[0].appendChild(el);
		}
	});
}
//gets the number of tickets a student has from firebase
function getTicketNum(studentNum) {
	var tickets;
	var team = "team-15";
	var query = firebase.database().ref(team + "/students/" + studentNum + "/tickets");
	query.once("value").then(function(snapshot) {
        tickets = snapshot.val();
		document.getElementById('tickets').innerHTML = "Tickets:" + tickets;
  });
  	return tickets;
}
//updates a students ticket number when he/she interacts with the site
function addTickets(studentNum) {
	var team = "team-15";
	var query = firebase.database().ref(team + "/students/" + studentNum + "/tickets");
	var tickets = query.once("value").then(function(snapshot){
		var tickets = snapshot.val();
		query.set(tickets + 100);
		location.reload()
	})
}

function teamTickets(team) {

}


getJournals();
getTicketNum(0);
