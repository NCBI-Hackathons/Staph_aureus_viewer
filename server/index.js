var express = require('express')
var app = express()

app.post('/upload', function(req, res) {
  console.log(req.files);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});