const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    answer: { type: String, required: true },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true
    },
    question: {
        type: mongoose.Types.ObjectId,
        ref: "questions",
        required: true
    },
})


const Answers = mongoose.model(
    'answers',
    schema
)

module.exports = Answers