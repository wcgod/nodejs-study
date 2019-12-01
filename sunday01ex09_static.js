// sunday01ex09_static.js
var http = require('http');
var express = require('express');
var app = express();
var static = require('serve-static');

// set() 이용해서 속성을 추가한다.
app.set('port', 3000);

// ejs 뷰엔진 등록 __dirname은 현재 실행되는 디렉토리
app.set('views', __dirname + '/views'); // prefix - 파일 경로
app.set('view engine', 'ejs'); // suffix - 확장자

app.use('/public', static(__dirname + '/public'));

app.get('/home', function(req, res) {
    console.log('GET - /home');

    var urlData = [
        {
            location : 'https://www.naver.com/',
            title : '네이버'
        },{
            location : 'https://www.daum.net/',
            title : '다음'
        },{
            location : 'https://www.google.com/',
            title : '구글'
        }
    ];

    req.app.render('home', {urlData: urlData}, function(err, html) {
        if(err) {
            console.log(err);
            return;
        }
        res.end(html);

    })
});

app.get('/profile', function(req, res) {
    console.log('GET - /profile');

    var info = {
        name : '김길동',
        job : '프로그래머',
        pay : '7200만원'
    }

    req.app.render('profile', {info: info}, function(err, html) {
        if(err) {
            console.log(err);
            return;
        }
        res.end(html);
    })
});

app.get('/', function(req, res) {
    console.log('GET - / 요청 들어옴 ...');

    // [파일명],[데이터],[콜백]  nodejs 첫번째 인자는 에러
    req.app.render('index', {user: 'KIM'}, function(err, html) {
        if(err) {
            console.log(err);
            return;
        }
        res.end(html);
    })
});

var server = http.createServer(app);  // http와 express 결합
server.listen(app.get('port'), function() {
    console.log('http://localhost:', app.get('port'));
});
