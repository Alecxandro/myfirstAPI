const mongoose = require('mongoose');

const Product = mongoose.model('product',{
    productName: String,
    quantity: Number,
    price: Number,
    available: Boolean,
})

module.exports = Product;