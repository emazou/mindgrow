const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4,
        max: 40
    },
    category: {
        type: String,
        required: true,
        min: 4,
        max: 40
    },
    description: {
        type: String,
        required: true,
        min: 20,
        max: 700
    },
    price: {
        type: Number,
        required: true,
        min: 1,
        max: 500
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
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

const Product = mongoose.model('products', productSchema)
module.exports = Product