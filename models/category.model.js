const mongoose = require ('mongoose');

const categorySchema = new mongoose.Schema({
    _id: {type: Number, required: true},
    name: {type: String, required: true},
    link_seo: { type: String, default: ''},
    serial: {type: Number, default: 1},
    description: { type: String, default: ''},
    content: { type: String, default: ''},
    hidden: {type: Boolean, default: false},
    day_create: { type: Date, default: Date.now },
    day_edit: { type: Date, default: ''},
})

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;