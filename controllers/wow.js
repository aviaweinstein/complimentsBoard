const Wow = require('../models/wow');

// retrieve a list of all wows
exports.list = (req, res) => {
	Wow.find({}, function (err, data) {
		res.render('index', { wow: data });
	});
};

// give a wow form
exports.give = (req, res) => {
	res.render('give_wow');
};

// create a wow
exports.post = (req, res) => {
	const data = req.body || {};
	console.log('posting');

	Wow.create(data)
		.then(() => {
			res.redirect('/');
		})
		.catch(err => {
			res.status(500).send(err);
		});
};
