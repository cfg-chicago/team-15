const express = require('express')
const path = require('path')

const app = express()
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index.ejs', {title: 'Code for Good'})
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
