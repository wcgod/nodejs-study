// sunday01ex06_http.js

const http = require('http');
const server = http.createServer();

server.on('request', function(req,res) {
    console.log('request 요청 됨!');
    res.end('GET - request ...');

    server.close();
    //server.setTimeout(1000);
});

server.on('connection', function(socket) {
    console.log('connection ...');
});

server.on('close', function() {
    console.log('close ...');
});

// 실행
server.listen(3000, function() {
    console.log('http://localhost:3000')
});
