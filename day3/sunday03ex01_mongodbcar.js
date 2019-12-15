// sunday03ex05_multer.js
const http = require('http');
const express = require('express');
const app = express();
const router = express.Router();
const static = require('serve-static');
const path = require('path');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

app.set('port', 3000);
app.set('views', path.join(__dirname, 'views')); // 접두사
app.set('view engine', 'ejs'); // 접미사

// 미들웨어 등록, __dirname 은 절대 경로
app.use('/', static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extendsed: false
}));
app.use(bodyParser.json());

// 다른 함수나 다른 기능에서 사용할 수 있도록 전역변수로 선언
let db;

function connectDB() {
    let dbUrl = 'mongodb://localhost';
    MongoClient.connect(dbUrl, {useUnifiedTopology: true }, (err, client)=>{
        if(err) throw err;

        db = client.db('vehicle');

        console.log('데이터베이스에 연결되었습니다.', dbUrl);
    });
}

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

// 함수 구현 부분
function addCar(db, carData, callback) {
    let car = db.collection('car');
    
    car.insertMany([carData], (err, result)=> {
        if(err) {
            console.log('#### 입력 에러 발생!');
            callback(err, null);
        }
        
        callback(null, result);
    });
}

function findCar(db, _id, callback) {
    let car = db.collection('car');
    
    car.findOne({"_id":new ObjectID(_id)}, (err, doc)=> {
        if(err) {
            console.log("자동차 검색 에러!");
            callback(err, null);
            return;
        }
        callback(null, doc);
    });
}

function modifyCar(db, _id, callback) {
    let car = db.collection('car');
    
    car.findOne({"_id":new ObjectID(_id)}, (err, doc)=> {
        if(err) {
            console.log("자동차 검색 에러!");
            callback(err, null);
            return;
        }
        callback(null, doc);
    });
}

function updateCar(db, carData, callback) {
    let car = db.collection('car');
    
    car.update({"_id":carData._id}, carData, function(err, result) {
        if(err) {
            console.log("수정 에러!");
            callback(err, null);
            return;
        }
        
        callback(null, result);
    })
}

function removeCar(db, _id, callback) {
    let car = db.collection('car');
    
    car.remove({"_id":new ObjectID(_id)}, function(err, result) {
        if(err) {
            console.log("삭제 에러!");
            callback(err, null);
            return;
        }
        
        callback(null, result);
    })
}

router.route('/car/list').get((req, res) => {
    //console.log('/car/list 요청됨');

    if(db) {
        let car = db.collection('car');

        car.find({}).toArray((err, arr)=>{
            // car_list.ejs 페이지로 렌더링
            req.app.render('car_list', {
                carList: arr
            }, (err2, html) => {
                if (err2) throw err2;

                res.end(html);
            });
        });
    }
});

// 자동차 상세 정보 , : >> params 객체에서 쓸수 있도록 만든다
router.route('/car/detail/:_id').get((req, res) => {
    //console.log('/car/detail/:_id 요청됨');

    //params에서 _id를 받아온다.
    let _id = req.params._id;
    
    if(db) {
        findCar(db, _id, (err, car)=> {
            if(err) {
                throw err;
            }
            if(car) {
                req.app.render('car_detail', {car:car}, (err2,html)=> {
                    if(err2) throw err2;
                    res.end(html);
                });
            } else {
                console.log('자동차 정보가 없습니다!');
            }            
        });
    } else {
        console.log("DB에 연결 안됨!");
    }
});

router.route('/car/input').post((req, res) => {
    //console.log('/car/list 요청됨');

    let car = {
        name: req.body.name,
        price: req.body.price,
        company: req.body.company,
        year: req.body.year
    }
    
    if(db) {
        addCar(db, car, (err, result)=> {
            if(err) throw err;
            
            if(result.insertedCount > 0) {
                console.log('#### 입력 성공!');
            } else {
                console.log('#### 입력 실패!');
            }   
        })
    }
});

// 자동차 정보 삭제
router.route('/car/delete/:_id').get((req, res) => {
    console.log('/car/delete:_id 요청됨 ...');

    let _id = req.params._id;

    if(db) {
        removeCar(db, _id, (err, result)=> {
            if(err)
                throw err;
            
            if(result.result.n > 0 && result.result.ok ==1) {
                console.log('#### 삭제 성공!');
            } else {
                console.log('#### 삭제 실패!');
            }   
        })

        // 목록으로 돌아간다.
        res.redirect('/car/list');
    } else {
        console.log("DB에 연결 안됨!");
    }
});

// 자동차 정보 수정 form
router.route('/car/modify/:_id').get((req, res) => {
    console.log('/car/modify/:_id 요청됨 ...');

    let _id = req.params._id;
    
    if(db) {
        findCar(db, _id, (err, car)=> {
            if(err) {
                throw err;
            }
            if(car) {
                req.app.render('car_modify', {car:car}, (err2,html)=> {
                    if(err2) throw err2;
                    res.end(html);
                });
            } else {
                console.log('자동차 정보가 없습니다!');
            }            
        });
    } else {
        console.log("DB에 연결 안됨!");
    }
});

// 자동차 정보 수정
router.route('/car/modify/:_id').post((req, res) => {
    console.log('/car/modify/:_id 요청됨 ...');

    let carData = {
        _id: new ObjectID(req.params._id),
        name: req.body.name,
        price: req.body.price,
        company: req.body.company,
        year: req.body.year
    };
    
    if(db) {
        updateCar(db, carData, (err, result)=> {
            if(err)
                throw err;
            if(result.result.nModified>0) {
                console.log(" 수정 완료 >> " +result.result.nModified);
            } else {
                console.log(" 수정 실패");
            }
        })

        // 목록으로 돌아간다.
        res.redirect('/car/list');
    } else {
        console.log("DB에 연결 안됨!");
    }
    
    res.redirect('/car/list');
});

//router 미들웨어 등록 (위치는 서버 실행하기 바로 위에 하는게 가장 안정적)
app.use('/', router);

const server = http.createServer(app); // http와 express 결합

server.listen(app.get('port'), () => {
    console.log(`http://localhost:${app.get('port')}`);
    connectDB();
});
