const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const mongooseStringQuery = require('mongoose-string-query');

const UserSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        hash: {
            type: String,
            required: true,
        }
    },
    { collection: 'users' },
);

// pre-save hook that sends email via custom email utility
// TODO: add email notification for new wows

UserSchema.plugin(timestamps); // automatically adds createdAt and updatedAt timestamps
UserSchema.plugin(mongooseStringQuery); // enables query capabilities (e.g. ?foo=bar)

module.exports = exports = mongoose.model('User', UserSchema); // export model for use
