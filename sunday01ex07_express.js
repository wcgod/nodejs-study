// sunday01ex07_express.js
var http = require('http');
var express = require('express');
var app = express();

// set() 이용해서 속성을 추가한다.
app.set('port', 3000);

app.get('/home', function(req, res) {
    res.end('GET - /home');
});

app.get('/profile', function(req, res) {
    res.end('GET - /profile');
});

app.get('/', function(req, res) {
    res.end('<h1>Gildong\'s homepage</h1>');
});

var server = http.createServer(app);  // http와 express 결합
server.listen(app.get('port'), function() {
    console.log('http://localhost:', app.get('port'));
});
