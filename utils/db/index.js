const mongoose = require('mongoose');
const url = 'mongodb://root:pass@localhost:27027/wowboard?authSource=admin';

mongoose.Promise = global.Promise;

const connection = mongoose.connect(url);

connection
	.then(db => {
		console.log(`Successfully connected to ${url} MongoDB cluster.`,);
		return db;
	})
	.catch(err => {
		if (err.message.code === 'ETIMEDOUT') {
			console.log('Attempting to re-establish database connection.');
			mongoose.connect(url);
		} else {
			console.log('Error while attempting to connect to database:');
			console.log(err);
		}
	});

module.exports = connection;