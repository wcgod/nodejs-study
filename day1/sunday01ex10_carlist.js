// sunday01ex10_carlist.js
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

// 전역변수 carList 선언
let carList = [
    {_id:0, name: 'Granduer', price: 2500, company: 'HYUNDAI', year: 2018},
    {_id:1, name: 'SM6', price: 2500, company: 'SAMSUNG', year: 2016},
    {_id:2, name: 'K7', price: 2500, company: 'KIA', year: 2017},
    {_id:3, name: 'Volvo', price: 2500, company: 'VOLVO', year: 2015}
];

// _id 증가시켜주는 시퀀스 값
let seq = 4;

app.get('/car/list', function(req, res) {
    console.log('GET - /car/list');

    req.app.render('car_list', {carList: carList}, function(err, html) {
        if(err) {
            console.log(err);
            return;
        }
        res.end(html);

    })
});

app.get('/car/input', function(req, res) {
    console.log('GET - /car/input');

    // carList 입력처리 후 /car/list 로 갱신한다.
    res.redirect('/car/list');
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
