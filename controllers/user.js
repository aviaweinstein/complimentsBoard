const Wow = require('../models/wow');

/* GET user profile. */
exports.get = async function (req, res, next) {
    const { _raw, _json, ...userProfile } = req.user;
    let wowsGiven;
    let wowsReceived;
    await Wow.find({ giver: userProfile.emails[0].value }, function (err, wows) {
        wowsGiven = wows;
	});
    await Wow.find({ receiver: userProfile.emails[0].value }, function (err, wows) {
        wowsReceived = wows;
	});
    res.render('user', {
        userProfile: JSON.stringify(userProfile, null, 2),
        title: 'Profile page',
        wowsGiven: wowsGiven,
        wowsReceived: wowsReceived,
    });
}
