var https = require('https');
var Stream = require('stream').Transform;
var fs = require('fs');
var path = require('path');
var orgin = 'https://qiniustatic.wodidashi.com/h5/app/qq-group/';
var arr = [
'qq-group.png',
'copy.png'
];
for (var i = 0; i < arr.length; i++) {
  downImage(arr[i]);
}

function downImage(params) {
  https.request(orgin + params, function (response) {
    var data = new Stream();

    response.on('data', function (chunk) {
      data.push(chunk);
    });

    response.on('end', function () {
      fs.writeFileSync(__dirname+'/image/' + params , data.read());
    });
  }).end();
}