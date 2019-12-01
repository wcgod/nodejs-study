// sunday01ex05_http.js
// http 내장모듈을 이용해서 간단히 웹서버 구현하기
var fs = require('fs');
var http = require('http');

// 서버 준비
var server = http.createServer(function(req,res) {
    console.log('서버에 요청 들어 옴 ...');

    // 한글 인코딩 200은 정상일 때
    //res.writeHead(200, {'Content-type':'text/html;charset=utf8'});
    //res.end('<h1>길동이의 홈페이지</h1>');

    var instream = fs.createReadStream('./sunday01ex05_http.html');
    instream.pipe(res);

});

// 서버 실행
server.listen(3000, function() {
    console.log('서버 실행 중 >>> http://localhost:3000');
})
