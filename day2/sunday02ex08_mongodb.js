// sunday02ex08_mongodb.js

const MongoClient = require('mongodb').MongoClient;

let dbUrl = 'mongodb://localhost';
let db;
MongoClient.connect(dbUrl, (err, client)=>{
    if(err) throw err;

    db = client.db('vehicle');
    let car = db.collection('car');

    car.find({}).toArray((err2, arr)=>{
        if(err2) throw err2;

        console.log(arr);
        client.close();
    });
});
