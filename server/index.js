var express = require('express');
var busboy = require('connect-busboy');
var { exec } = require('child_process');
var fs = require('fs');
var app = express();

app.use(express.static('../web'));
app.use(express.static('jobs'));
app.use(busboy({ immediate: true }));

app.get('/run', function (req, res) {
  var send = exec('echo "'+req.query.comment+'" | mail -s "StaphBrowse - Community Message" stuart.brown@nyumc.org');
  send.on('close', function (code) {
    console.log(`child process exited with code ${code}`);
  });
})

app.post('/upload', function (req, res) {
  var jobID = Math.floor(Math.random() * 100000)
  var filepath = ''
  var email = ''

  req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    console.log(filename);
    fs.mkdirSync('jobs/' + jobID);
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