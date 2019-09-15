const Wow = require('../models/wow');
const User = require('../models/user');

/* GET user profile. */
exports.get = function (req, res, next) {
    const { _raw, _json, ...userProfile } = req.user;
    let wowsGiven;
    let wowsReceived;
    let currentUser;
    User.findOne({ email: userProfile.emails[0].value })
        .then(user => {
            currentUser = user;
            return Wow.find({ giver: userProfile.emails[0].value }).populate('giverUser').populate('receiverUser');
        })
        .then(wows => {
            wowsGiven = wows;
            return Wow.find({ receiver: userProfile.emails[0].value }).populate('giverUser').populate('receiverUser');
        })
        .then(wows => {
            wowsReceived = wows;
            return res.render('user', {
                userProfile: JSON.stringify(userProfile, null, 2),
                title: 'Profile page',
                currentUser,
                wowsGiven,
                wowsReceived,
            });
        })
        .catch(err => {
			res.status(500).send(err);
		});
}
