const mongoose = require('mongoose');

// khai bao nhung field co trong obj products ( hay bang products)
const productsSchema = new mongoose.Schema({
    stt: { type: Number, default: 1},
    name: { type: String, required: true},
    avata: String,
    price: { type: String, default: 0},
    count: Number,
    decription: String,
    content: String,
    catalog_id: { type: String, required: true},
    hidden: {type: Boolean, default: true},
    day_create: { type: Date, default: Date.now },
    day_edit: Date
})

const Products = mongoose.model('User', productsSchema);

model.exports = Products;

