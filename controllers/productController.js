// const { query } = require('express')
const Product = require('../models/Product')
const Joi = require('joi')

const validator = Joi.object({
    name: Joi.string().min(4).max(40),
    category: Joi.string().min(4).max(40),
    description: Joi.string().min(20).max(700),
    price: Joi.number().integer().min(1).max(500),
    stock: Joi.number().integer().min(0),
    photo: Joi.string().uri().message('INVALID_URL'),
})

const productController = {
    create: async (req, res) => {
        try {
            let result = await validator.validateAsync(req.body)
            let product = await new Product(req.body).save()
            res.status(201).json({
                message: 'Product created',
                success: true,
            })
        } catch (error) {
            res.status(400).json({
                message: error.message,
                success: false
            })
        }
    },
    readAll: async (req, res) => {
        let products;
        let query = {};
        let sort;

        if (req.query.product) {
            const queryString = new RegExp(`^${req.query.product}`)
            query.product = { $regex: queryString, $options: 'i' }
        }
        if (req.query.sort) {
            sort = req.query.sort
        }
        try {
            products = await Product.find(query).sort({ price: sort })
            res.json({
                message: "You get products",
                response: products,
                success: true
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: "Error",
                success: false
            })
        }
    },
    update: async (req, res) => {
        const { id } = req.params
        const city = req.body
        try {
            let result = await validator.validateAsync(req.body)

            let newCity = await City.findOneAndUpdate({ _id: id }, city, { new: true })
            if (city) {
                res.status(200).json({
                    message: "Your city is update",
                    response: newCity,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "We couldn't update your city",
                    success: false
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: error.message,
                success: false
            })
        }
    },
    destroy: async (req, res) => {
        const { id } = req.params
        try {
            let city = await City.findOneAndDelete({ _id: id })
            if (city) {
                res.status(200).json({
                    message: "Your city is deleted",
                    response: city,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "We couldn't delete your city",
                    success: false
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: "error",
                success: false
            })
        }
    }
}
module.exports = productController