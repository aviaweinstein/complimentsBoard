let express = require('express');
let router = express.Router();
let secured = require('../lib/middleware/secured');

/* GET user profile. */
router.get('/user', secured(), function (req, res, next) {
    const { _raw, _json, ...userProfile } = req.user;
    res.render('user', {
        userProfile: JSON.stringify(userProfile, null, 2),
        title: 'Profile page'
    });
});

module.exports = router;
