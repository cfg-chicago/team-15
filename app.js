const express = require('express')
const app = express()
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
