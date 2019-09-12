const express = require('express');
const router = express.Router();
const passport = require('passport');
const Auth = require('../controllers/auth');

// Perform the login, after login Auth0 will redirect to callback
router.get('/login', passport.authenticate('auth0', {
    scope: 'openid email profile'
}), function (req, res) {
    res.redirect('/');
});

// Perform the final stage of authentication and redirect to previously requested URL or '/user'
router.get('/callback', Auth.login);

// Perform session logout and redirect to homepage
router.get('/logout', Auth.logout);

module.exports = router;
