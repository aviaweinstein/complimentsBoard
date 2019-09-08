const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const mongooseStringQuery = require('mongoose-string-query');

const WowSchema = new Schema(
    {
        text: String,
            // lowercase: true,
            // trim: true,
            // index: true,
            // unique: true,
            // required: true,
        giver: String,
            // trim: true,
            // required: true,
        receiver: String,
            // trim: true,
            // required: true,
    },
    { collection: 'wows' },
);

// pre-save hook that sends email via custom email utility
// TODO: add email notification for new wows

WowSchema.plugin(timestamps); // automatically adds createdAt and updatedAt timestamps
WowSchema.plugin(mongooseStringQuery); // enables query capabilities (e.g. ?foo=bar)

module.exports = exports = mongoose.model('Wow', WowSchema); // export model for use
