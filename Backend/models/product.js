const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    category: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
    isTrending: { type: Boolean, default: false }
});


module.exports = mongoose.model('Product', ProductSchema);
