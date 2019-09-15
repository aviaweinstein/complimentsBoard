const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const mongooseStringQuery = require('mongoose-string-query');

const email = require('../utils/email');

const WowSchema = new Schema(
    {
        text: {
            type: String,
            // lowercase: true,
            trim: true,
            // index: true,
            // unique: true,
            required: true,
        },
        giver: {
            type: String,
            lowercase: true,
            trim: true,
            required: true,
        },
        receiver: {
            type: String,
            lowercase: true,
            trim: true,
            required: true,
        },
    },
    { collection: 'wows' },
);

WowSchema.pre('save', function(next) {
	if (!this.isNew) {
		next();
	}

	email(this.toObject())
		.then(() => {
			next();
		})
		.catch(err => {
			console.log(err);
			next();
		});
});

WowSchema.plugin(timestamps); // automatically adds createdAt and updatedAt timestamps
WowSchema.plugin(mongooseStringQuery); // enables query capabilities (e.g. ?foo=bar)

module.exports = exports = mongoose.model('Wow', WowSchema); // export model for use
