// sunday02ex02_express.js carList 배열을 만들어 화면에 뿌려준다.
const http = require('http');
const express = require('express');
const app = express();
const router = express.Router();
const static = require('serve-static');
const path = require('path');

app.set('port', 3000);
app.set('views', path.join(__dirname, 'views')); // 접두사
app.set('view engine', 'ejs'); // 접미사

// __dirname 은 절대 경로
app.use('/', static(path.join(__dirname, 'public')));

const carList = [
    {_id:1, name:'Sonata', price:2000, company:'HYUNDAI', year:2019},
    {_id:2, name:'SM6', price:3000, company:'SAMSUNG', year:2106}
];
let seq = 3;

router.route('/car/list').get((req, res)=> {
    console.log('/car/list 요청됨');

    // car_lst.ejs 페이지로 렌더링
    req.app.render('car_list2', {carList:carList}, (err, html)=>{
        if(err) throw err;

        res.end(html);
    })
});

//router 미들웨어 등록 (위치는 서버 실행하기 바로 위에 하는게 가장 안정적)
app.use('/', router);

const server = http.createServer(app); // http와 express 결합

server.listen(app.get('port'), ()=>{
   console.log(`http://localhost:${app.get('port')}`);
});
