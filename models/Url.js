const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const { Schema } = mongoose;

const urlSchema = new Schema({
    origin: {
        type: String,
        unique: true,
        required: true
    },
    shortURL: {
        type: String,
        unique: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,//esto lo administra mongodb
        ref: 'User'

    }
});

const Url = mongoose.model('Url', urlSchema);
module.exports = Url;