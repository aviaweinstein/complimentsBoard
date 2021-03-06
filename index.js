const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let dotenv = require('dotenv');
let passport = require('passport');
let Auth0Strategy = require('passport-auth0');
let flash = require('connect-flash');
let userInViews = require('./lib/middleware/userInViews');
let authRouter = require('./routes/auth');
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let wowsRouter = require('./routes/wows');

dotenv.config();
// Configure Passport to use Auth0
let strategy = new Auth0Strategy(
    {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL: process.env.AUTH0_CALLBACK_URL,
    },
    function (accessToken, refreshToken, extraParams, profile, done) {
        // accessToken is the token to call Auth0 API (not needed in the most cases)
        // extraParams.id_token has the JSON Web Token
        // profile has all the information from the user
        return done(null, profile);
    }
);

passport.use(strategy);

// You can use this section to keep a smaller payload
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
// config express-session
let sess = {
    secret: process.env.EXPRESS_SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true
};

if (app.get('env') === 'production') {
    sess.cookie.secure = true; // serve secure cookies, requires https
}

app.use(session(sess));

app.use(passport.initialize());
app.use(passport.session());

// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));

// Handle auth failure error messages
app.use(function (req, res, next) {
    if (req && req.query && req.query.error) {
        req.flash('error', req.query.error);
    }
    if (req && req.query && req.query.error_description) {
        req.flash('error_description', req.query.error_description);
    }
    next();
});

app.use(userInViews());
app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', wowsRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handlers

// Development error handler
// Will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
        message: err.message,
        error: err
        });
    });
}

// Production error handler
// No stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// the server is listening on port 3000 for connections
app.listen(3000, function (err) {
    console.log('App listening on port 3000!');
	if (err) {
        console.log(err);
	}

	require('./utils/db');
});

module.exports = app;
