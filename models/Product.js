const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    stock: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: true
    }
},
{
    collection: 'products'
});

module.exports = mongoose.model('Product', productSchema);