var express = require('express');
var busboy = require('connect-busboy');
var app = express();

app.use(express.static('../web'));
app.use(busboy({ immediate: true }));

app.post('/upload', function (req, res) {
  req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    console.log(filename);
  });
  req.busboy.on('email', function (key, value, keyTruncated, valueTruncated) {
    console.log(value);
  });
  res.send('sure');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});