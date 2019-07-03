var https = require('https');
var Stream = require('stream').Transform;
var fs = require('fs');
var path = require('path');
var orgin = 'https://qiniustatic.wodidashi.com/h5/about-wb/';
var arr = [
'logo'
];

var ext ='.png';
for (var i = 0; i < arr.length; i++) {
  downImage(arr[i]);
}

function downImage(params) {
  https.request(orgin + params + ext, function (response) {
    var data = new Stream();

    response.on('data', function (chunk) {
      data.push(chunk);
    });

    response.on('end', function () {
      fs.writeFileSync(__dirname+'/image/' + params + ext, data.read());
    });
  }).end();
}