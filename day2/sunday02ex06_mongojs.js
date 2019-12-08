// sunday02ex06_mongojs.js

// npm i -S mongojs mongodb
// node.js에서 mongodb 사용하기

const mongojs = require('mongojs');

let db = mongojs('vehicle', ['car']);

db.car.find(function(err, data) {
    console.dir(data[0]);
});
