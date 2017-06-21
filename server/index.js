var express = require('express');
var busboy = require('connect-busboy');
var fs = require('fs');
var app = express();

app.use(express.static('../web'));
app.use(express.static('jobs'));
app.use(busboy({ immediate: true }));

app.post('/upload', function (req, res) {
  var jobID = Math.floor(Math.random() * 100000)
  var filepath = ''
  var email = ''

  req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    console.log(filename);
    fs.mkdirSync('jobs/'+jobID);
    filepath = 'jobs/' + jobID + '/uploaded.fna'
    file.pipe(fs.createWriteStream(filepath));
  });
  req.busboy.on('field', function (key, value, keyTruncated, valueTruncated) {
    email = value;
  });
  req.busboy.on('finish', function () {
    res.send('accepted');
  });

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});