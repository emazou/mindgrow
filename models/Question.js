const mongoose = require('mongoose')
const questionSchema = new mongoose.Schema({
    question: { type: String, required: true, min: 4, max: 300 },
    user: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
    product: { type: mongoose.Types.ObjectId, ref: 'products', required: true },
})
const Question = mongoose.model(
    'question',
    questionSchema
)
module.exports = Question