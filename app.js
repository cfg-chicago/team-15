const express = require('express')
const path = require('path')
const admin = require('firebase-admin')
const app = express()
const serviceAccount = require('./codeforgood15-firebase-adminsdk-crr73-f0da8dd9d2.json')
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
var tone_analyzer = new ToneAnalyzerV3({
  username: '96f3c9de-87a8-40d4-b275-953443eb8c0d',
  password: 'HXp3a5vWALXH',
  version_date: '2017-09-21'
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://codeforgood15.firebaseio.com"
});

var db = admin.database();
var entryToUse;
db.ref('team-15/students/0/journals/0').once('value',function(snapshot){
	const journal = snapshot.val();
	const entry = journal.entry;
	entryToUse = entry;
	var params = {
  // Get the text from the JSON file.
	  text: entryToUse,
	  tones: ['emotion', 'language', 'social']
	};

	tone_analyzer.tone(params, function(error, response) {
	  if (error)
	    console.log('error:', error);
	  else
	    console.log(JSON.stringify(response, null, 2));
	  }
	);
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('home_page.ejs', {title: 'Code for Good'})
})

app.get('/studentgrades.ejs', function (req, res) {
  res.render('studentgrades.ejs', {title: 'Code for Good'})
})

app.get('/index.ejs', function (req, res) {
  res.render('index.ejs', {title: 'Code for Good'})
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
