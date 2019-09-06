const fs = require('fs');
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const jwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
const cors = require('cors');
// const compression = require('compression');
// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

const app = express();
// const url = 'mongodb://root:pass@localhost:27027/admin';
// const dbName = 'wowboard';

app.set('view engine', 'ejs');
app.use(cors());
app.use(jwt());
app.use(errorHandler);
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Use connect method to connect to the Server
// MongoClient.connect(url, function(err, client) {
//     assert.equal(null, err);
//     console.log("Connected successfully to server");

//     const db = client.db(dbName);

//     // app.post('/addwow', function (req, res) {
//     //     var newWow = req.body.newwow;
//     //     db.collection('wow').insertOne({text: newWow, giver: 'aweinstein@vacayhomeconnect.com', receiver: 'zkann@vacayhomeconnect.com'});
//     //     res.redirect('/');
//     // });

//     // app.get('/', function(req, res) {
//     //     db.collection('wow').find({}).toArray(function(err, result) {
//     //         if (err) {
//     //             throw err;
//     //             return res.status(400).send(err);
//     //         }
//     //         res.render('index', { wow: result });
//     //     });
//     // });
// });

// the server is listening on port 3000 for connections
app.listen(3000, function (err) {
    console.log('App listening on port 3000!');
	if (err) {
        console.log(err);
	}

	require('./utils/db');

    // loop through all routes and dynamically require them – passing api
    fs.readdirSync(path.join(__dirname, 'routes')).map(file => {
        console.log(file);
        require('./routes/' + file)(app);
    });
});

module.exports = app;
