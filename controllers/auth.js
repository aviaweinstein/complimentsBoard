const util = require('util');
const url = require('url');
const querystring = require('querystring');
const passport = require('passport');
const User = require('../models/user');

// logs a user out
exports.logout = (req, res) => {
    req.logout();

    var returnTo = req.protocol + '://' + req.hostname;
    var port = req.connection.localPort;
    if (port !== undefined && port !== 80 && port !== 443) {
        returnTo += ':' + port;
    }
    var logoutURL = new url.URL(
        util.format('https://%s/logout', process.env.AUTH0_DOMAIN)
    );
    var searchString = querystring.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        returnTo: returnTo
    });
    logoutURL.search = searchString;

    res.redirect(logoutURL);
}

// logs a user in
exports.login = (req, res, next) => {
    passport.authenticate('auth0', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }

        let params = {
            firstName: user.name.givenName,
            lastName: user.name.familyName,
            email: user.emails[0].value,
            user_id: user.user_id,
            picture: user.picture
        }
        for(let prop in params) if(!params[prop]) delete params[prop];

        User.findOneAndUpdate(
            { email: user.emails[0].value },
            params,
            { upsert: true, useFindAndModify: false },
            function (err, existingUser) {
                if (err) {
                    return next(new Error(err));
                }
            }
        );
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            const returnTo = req.session.returnTo;
            delete req.session.returnTo;
            res.redirect(returnTo || '/user');
        });
    })(req, res, next);
}