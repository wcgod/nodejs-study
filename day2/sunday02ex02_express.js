// sunday02ex02_express.js input.html
const http = require('http');
const express = require('express');
const app = express();
const router = express.Router();
const static = require('serve-static');
const path = require('path');
const bodyParser = require('body-parser');

app.set('port', 3000);
app.set('views', path.join(__dirname, 'views')); // 접두사
app.set('view engine', 'ejs'); // 접미사

// __dirname 은 절대 경로
app.use('/', static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extendsed: false
}));
app.use(bodyParser.json());

let carList = [
    {
        _id: 1,
        name: 'Sonata',
        price: 2000,
        company: 'HYUNDAI',
        year: 2019
    },
    {
        _id: 2,
        name: 'SM6',
        price: 3000,
        company: 'SAMSUNG',
        year: 2106
    }
];
let seq = 3;

router.route('/car/list').get((req, res) => {
    //console.log('/car/list 요청됨');

    // car_list.ejs 페이지로 렌더링
    req.app.render('car_list', {
        carList: carList
    }, (err, html) => {
        if (err) throw err;

        res.end(html);
    })
});
// : >> params 객체에서 쓸수 있도록 만든다
router.route('/car/detail/:_id').get((req, res) => {
    //console.log('/car/detail/:_id 요청됨');

    //params에서 _id를 받아온다.
    let _id = req.params._id;
    let car = null;
    for (item of carList) {
        if (item._id == _id) {
            car = item;
            break;
        }
    }
    if (car == null) {
        console.log('검색 내용이 없습니다.');
    }

    //car_detail.ejs 페이지로 렌더링
    req.app.render('car_detail', {
        car: car
    }, (err, html) => {
        if (err) throw err;

        res.end(html);
    })
});

router.route('/car/input').post((req, res) => {
    //console.log('/car/input 요청됨 ...');

    let car = {
        _id: seq++,
        name: req.body.name,
        price: req.body.price,
        company: req.body.company,
        year: req.body.year
    };
    // 목록에 넣어준다. 저장하기 - 나중에 몽고디비에 저장
    carList.push(car);

    // 목록으로 돌아간다.
    res.redirect('/car/list');

});

//router 미들웨어 등록 (위치는 서버 실행하기 바로 위에 하는게 가장 안정적)
app.use('/', router);

const server = http.createServer(app); // http와 express 결합

server.listen(app.get('port'), () => {
    console.log(`http://localhost:${app.get('port')}`);
});
