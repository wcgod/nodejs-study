// sunday02ex07_mongodb.js

const MongoClient = require('mongodb').MongoClient;

let dbUrl = 'mongodb://localhost';
let db;
MongoClient.connect(dbUrl, (err, client)=>{
    if(err) throw err;

    db = client.db('vehicle');
    let car = db.collection('car');

    car.findOne({}, (err2, result)=>{
        if(err2) throw err2;

        console.log(result.name, result.company);
        client.close();
    });
});
