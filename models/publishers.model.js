const mongoose = require ('mongoose');

const publisherSchema = new mongoose.Schema({
    _id: {type: Number, required: true},
    name: {type: String, required: true},
    serial: {type: Number, default: 1},
    description: { type: String, default: ''},
    content: { type: String, default: ''},
    hidden: {type: Boolean, default: false},
    day_create: { type: Date, default: Date.now },
    day_edit: { type: Date, default: ''},
})

const Publisher = mongoose.model('Publisher', publisherSchema);

module.exports = Publisher;