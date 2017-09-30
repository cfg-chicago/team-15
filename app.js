const express = require('express')
const path = require('path')

const app = express()

var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
var tone_analyzer = new ToneAnalyzerV3({
  username: '{username}',
  password: '{password}',
  version_date: '{version}'
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('studentgrades.ejs', {title: 'Code for Good'})
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
