const mongoose = require('mongoose')

const publicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 4,
        max: 100
    },
    description: {
        type: String,
        required: true,
        min: 4,
        max: 3000
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true,
        min: 4,
        max: 40
    },
    url: {
        type: String,
        required: true,
        validate: function (value) {
            if (!value.startsWith('http')) {
                throw new Error('The URL must start with http')
            }
        }
    },
    photo: {
        type: String,
        required: true,
        validate: function (value) {
            if (!value.startsWith('http')) {
                throw new Error('The URL must start with http')
            }
        }
    }
})

const Publication = mongoose.model(
    'publications',
    publicationSchema
)

module.exports = Publication