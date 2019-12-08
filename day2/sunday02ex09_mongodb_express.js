// sunday02ex09_mongodb_express.js

const MongoClient = require('mongodb').MongoClient;
const http = require('http');
const express = require('express');
const app = express();

// 다른 함수나 다른 기능에서 사용할 수 있도록 전역변수로 선언
let db;

function connectDB() {
    let dbUrl = 'mongodb://localhost';
    MongoClient.connect(dbUrl, (err, client)=>{
        if(err) throw err;

        db = client.db('vehicle');

        console.log('데이터베이스에 연결되었습니다.', dbUrl);
    });
}

const server = http.createServer(app);
server.listen(3000, ()=>{
    console.log('http://localhost:3000');
    connectDB();  // express 서버에서 mongodb 사용 가능.
});
