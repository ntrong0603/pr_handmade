const mongoose = require('mongoose');

// khai bao nhung field co trong obj user ( hay bang user)
const userSchema = new mongoose.Schema({
    user_name: { type: String, required: true},
    password: { type: String, required: true},
    name: { type: String, required: true},
    email: String,
    phone: String,
    adress: String,
    avata: String,
    role: {type: Number, default: 1},
    day_create: { type: Date, default: Date.now },
    day_edit: Date
})

const User = mongoose.model('User', userSchema);

module.exports = User;

