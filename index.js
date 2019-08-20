var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//the wow array with initial placeholders for added wow
var wow = ['You are awesome', 'Thanks for your help'];

const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('user');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs)
        callback(docs);
    });
}

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const url = 'mongodb://root:pass@localhost:27027/admin';

const dbName = 'wowboard';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    findDocuments(db, function() {
        client.close();
    });

    app.post('/addwow', function (req, res) {
        var newWow = req.body.newwow;
        db.wow.insertOne({text: newWow, giver: 'aweinstein@vacayhomeconnect.com', receiver: 'zkann@vacayhomeconnect.com'});
        res.redirect('/');
    });

    app.get('/', function(req, res) {
        db.collection('wow').find({}).toArray(function(err, result) {
            // if (err) {
            //     throw err;
            //     return res.status(400).send(err);
            // }
            // console.log(result);
            res.render('index', { wow: result });
        });
    });
});

// the server is listening on port 3000 for connections
app.listen(3000, function () {
    console.log('App listening on port 3000!')
});

// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
 
// // Connection URL
// const url = 'mongodb://root:pass@localhost:27027/admin';
 
// // Database Name
// const dbName = 'myproject';
 
// // Use connect method to connect to the server
// MongoClient.connect(url, function(err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
 
//   const db = client.db(dbName);
 
//   insertDocuments(db, function() {
//     client.close();
//   });
// });

// const insertDocuments = function(db, callback) {
//     // Get the documents collection
//     const collection = db.collection('documents');
//     // Insert some documents
//     collection.insertMany([
//       {a : 1}, {a : 2}, {a : 3}
//     ], function(err, result) {
//       assert.equal(err, null);
//       assert.equal(3, result.result.n);
//       assert.equal(3, result.ops.length);
//       console.log("Inserted 3 documents into the collection");
//       callback(result);
//     });
//   }