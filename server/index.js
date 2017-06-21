var express = require('express');
var busboy = require('connect-busboy');
var { exec } = require('child_process');
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
    fs.mkdirSync('jobs/' + jobID);
    filepath = 'jobs/' + jobID + '/uploaded.fa'
    file.pipe(fs.createWriteStream(filepath));
  });
  req.busboy.on('field', function (key, value, keyTruncated, valueTruncated) {
    email = value;
  });
  req.busboy.on('finish', function () {
    res.send('accepted');
    var run = exec('/home/ubuntu/staph_team/genomes/staph_pipeline.sh '+jobID);
    run.on('close', function (code) {
      console.log(`run exited with code ${code}`);
      var send = exec('echo "Your link to the result is: http://localhost:7777/#' + jobID + '" | mail -s "StaphBrowse - Run Finished" '+ email);
      send.on('close', function (code) {
        console.log(`send mail exited with code ${code}`);
      });
    })
  });

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});