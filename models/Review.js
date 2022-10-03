const mongoose = require('mongoose')
const reviewSchema = new mongoose.Schema({
    review: { type: String, required: true, min: 4, max: 300 },
    user: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
    product: { type: mongoose.Types.ObjectId, ref: 'products', required: true },
})
const Review = mongoose.model(
    'reviews',
    reviewSchema
)
module.exports = Review