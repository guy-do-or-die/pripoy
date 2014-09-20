var express = require('express');
var path = require('path');
var app = express();

app.set('port', (process.env.PORT || 3000))
app.use('/', express.static(__dirname + '/public'))
app.use(express.favicon(path.join(__dirname, 'public', 'img', 'sharp.ico')));

app.listen(app.get('port'), function() {
  console.log("got it!")
})
