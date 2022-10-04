const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    comment: { type: String, required: true },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true
    },
})


const Comment = mongoose.model(
    'comments',
    schema
)

module.exports = Comment