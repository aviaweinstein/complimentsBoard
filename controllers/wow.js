const Wow = require('../models/wow');
const mongoose = require('mongoose');

// retrieve a list of all wows
exports.list = (req, res) => {
	// const query = req.query || {};

	// Wow.apiQuery(query)
	// 	// // limit the information returned (server side) – e.g. no password
	// 	// .select('name email username bio url twitter background')
	// 	.then(wows => {
	// 		res.json(wows);
	// 		console.log(wows);
	// 		// res.render('index', { wow: wows });
	// 	})
	// 	.catch(err => {
	// 		res.status(422).send(err.errors);
	// 	});
	Wow.find({}, function (err, data) {
		console.log(data); // it will print your collection data
		res.render('index', { wow: data });
	});
	// mongoose.connection.db.collection('wows', function (err, collection) {
	// 	// Locate all the entries using find
	// 	collection.find().toArray(function(err, wows) {
	// 		/* whatever you want to do with the results in node such as the following
	// 			 res.render('home', {
	// 				 'title': 'MyTitle',
	// 				 'data': results
	// 			 });
	// 		*/
	// 		console.log(wows);
	// 		res.render('index', { wow: wows });
	// 	});
	// });
};

// create a wow
exports.post = (req, res) => {
	const data = req.body || {};
	console.log('posting');

	Wow.create(data)
		.then(wow => {
			res.json(wow);
			return res.redirect('/');
		})
		.catch(err => {
			res.status(500).send(err);
		});
};
