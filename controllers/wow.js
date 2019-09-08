const Wow = require('../models/wow');
const User = require('../models/user');

// retrieve a list of all wows
exports.list = (req, res) => {
	Wow.find({}, function (err, data) {
		res.render('index', { wow: data });
	});
};

// give a wow form
exports.give = (req, res) => {
	User.find({}, function (err, users) {
		res.render('give_wow', { users: users });
	});
};

// create a wow
exports.post = (req, res) => {
	const data = req.body || {};
    const { _raw, _json, ...userProfile } = req.user;
	data.giver = userProfile.user_id;
	console.log('posting');

	Wow.create(data)
		.then(() => {
			res.redirect('/');
		})
		.catch(err => {
			res.status(500).send(err);
		});
};
