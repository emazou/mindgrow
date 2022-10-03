const mongoose = require('mongoose')

const publicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 4,
        max: 40
    },
    description: {
        type: String,
        required: true,
        min: 4,
        max: 500
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true
    },
    fecha: {
        type: Number,
        required: true,
    }
})

const Publication = mongoose.model(
    'publications',
    publicationSchema
)

module.exports = Publication