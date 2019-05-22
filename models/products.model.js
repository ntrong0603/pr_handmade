const mongoose = require('mongoose');

// khai bao nhung field co trong obj products ( hay bang products)
const productsSchema = new mongoose.Schema({
    _id: Number,
    serial: { type: Number, default: 1},
    name: { type: String, required: true},
    link_seo: { type: String, default: ''},
    avata: { type: String, default: ''},
    price: { type: String, default: 0},
    count: { type: Number, default: 0},
    sold: { type: Number, default: 0},
    description: { type: String, default: ''},
    content: { type: String, default: ''},
    view: { type: Number, default: 0},
    category_id: { type: String, required: true},
    publishing_id: { type: String, required: true},
    hidden: {type: Boolean, default: true},
    day_create: { type: Date, default: Date.now },
    day_edit: { type: Date, default: ''},
})

const Products = mongoose.model('User', productsSchema);

module.exports = Products;

