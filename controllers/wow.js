const Wow = require('../models/wow');
const User = require('../models/user');

// retrieve a list of all wows
exports.list = (req, res) => {
	Wow.find({}).populate('giverUser').populate('receiverUser')
		.then(data => {
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
	data.giver = userProfile.emails[0].value;

	User.findOne({ email: data.giver })
		.then(giverUser => {
			data.giverUser = giverUser._id;
			return User.findOne({ email: data.receiver })
		})
		.then(receiverUser => {
			data.receiverUser = receiverUser._id;
			return Wow.create(data);
		})
		.then(wow => {
			res.redirect('/');
		})
		.catch(err => {
			res.status(500).send(err);
		});
};
