var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//the wow array with initial placeholders for added wow
var wow = ['You are awesome', 'Thanks for your help'];

app.post('/addwow', function (req, res) {
    var newWow = req.body.newwow;
    wow.push(newWow);
    res.redirect('/');
});

app.get('/', function(req, res) {
    res.render('index', { wow: wow });
});

// the server is listening on port 3000 for connections
app.listen(3000, function () {
    console.log('App listening on port 3000!')
});

