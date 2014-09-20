var express = require('express')
var app = express();

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('here we are! #pripoy\n<h1>BLACK METAL!! /m/ /m/</h1>');
})

app.listen(app.get('port'), function() {
  console.log("got it!")
})
