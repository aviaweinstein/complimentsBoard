const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const mongooseStringQuery = require('mongoose-string-query');

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            // lowercase: true,
            trim: true,
            // index: true,
            // unique: true,
            required: true,
        },
        lastName: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },
        user_id: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },
        picture: {
            type: String,
            trim: true,
            // unique: true,
            // required: true,
        },
    },
    { collection: 'users' },
);

// pre-save hook that sends email via custom email utility
// TODO: add email notification for new wows

UserSchema.plugin(timestamps); // automatically adds createdAt and updatedAt timestamps
UserSchema.plugin(mongooseStringQuery); // enables query capabilities (e.g. ?foo=bar)

module.exports = exports = mongoose.model('User', UserSchema); // export model for use
