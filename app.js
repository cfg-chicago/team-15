const express = require('express')
const path = require('path')
const app = express()

var entryToUse;
// db.ref('team-15/students/0/journals/0').once('value',function(snapshot){
// 	const journal = snapshot.val();
// 	const entry = journal.entry;
// 	entryToUse = entry;
	

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('home_page.ejs', {title: 'Code for Good'})
})

app.get('/index.ejs', function (req, res) {
  res.render('index.ejs', {title: 'Code for Good'})
})





app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
