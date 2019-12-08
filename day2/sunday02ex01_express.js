// sunday02ex01_express.js
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

router.route('/car/list').get((req, res)=> {
    console.log('/car/list 요청됨');

    // car_lst.ejs 페이지로 렌더링
    req.app.render('car_list', {}, (err, html)=>{
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
