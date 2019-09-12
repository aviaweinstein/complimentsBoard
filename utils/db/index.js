const mongoose = require('mongoose');
const url = process.env.DB;

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

const connection = mongoose.connect(url, { useNewUrlParser: true });

connection
	.then(db => {
		console.log(`Successfully connected to MongoDB cluster.`);
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