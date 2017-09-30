const express = require('express')
const path = require('path')

const app = express()

// var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
// var tone_analyzer = new ToneAnalyzerV3({
//   username: '{username}',
//   password: '{password}',
//   version_date: '{version}'
// });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('home_page.ejs', {title: 'Code for Good'})
})

app.get('/index.ejs', function (req, res) {
  res.render('index.ejs', {title: 'Code for Good'})
})

app.get('/studentgrades.ejs', function (req, res) {
  res.render('studentgrades.ejs', {title: 'Code for Good'})
})
// var params = {
//   // Get the text from the JSON file.
//   text: require('tone.json').text,
//   tones: ['emotion', 'language', 'social']
// };

// tone_analyzer.tone(params, function(error, response) {
//   if (error)
//     console.log('error:', error);
//   else
//     console.log(JSON.stringify(response, null, 2));
//   }
// );


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
