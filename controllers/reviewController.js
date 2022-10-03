const Review = require('../models/Review')
const Joi = require('joi')

const validator = Joi.object({
    review: Joi.string().min(4).max(300).required(),
    user: Joi.required(),
    product: Joi.required()
})
const reviewController = {
    readAll: async (req, res) => {
        let query = {}
        if (req.query.product) {
            query.product = req.query.product
        }
        try {
            let reviews = await Review.find(query)
                .populate('user', { name: 1, lastName: 1, photo: 1, country: 1 })
                .populate('product')
            if (reviews) {
                res.status(200).json({
                    message: 'You get reviews',
                    response: reviews,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "Could't find reviews",
                    success: false
                })
            }
        } catch (error) {
            res.status(400).json({
                message: error.message,
                success: false
            })
        }
    },
    create: async (req, res) => {
        const { review, product } = req.body
        const user = req.user.id
        console.log(user)
        try {
            let result = await validator.validateAsync({ review, user, product });
            await new Review({ review, user, product }).save()
            res.status(201).json({
                message: 'Review created',
                success: true
            })
        } catch (error) {
            console.log(error.message)
            res.status(400).json({
                message: 'Review not created',
                success: false
            })
        }
    },
    update: async (req, res) => {
        const { id } = req.params
        const { review } = req.body
        try {
            let Reviewdb = await Review.findOneAndUpdate({ _id: id }, {review}, { new: true })
            if (Reviewdb) {
                res.status(200).json({
                    message: 'You modified one review',
                    response: Reviewdb,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "Could't find review",
                    success: false
                })
            }
        } catch (error) {
            res.status(400).json({
                message: error.message,
                success: false
            })
        }
    },
    destroy: async (req, res) => {
        const { id } = req.params
        try {
            let review = await Review.findOneAndDelete({ _id: id })
            if (review) {
                res.status(200).json({
                    message: 'You deleted one review',
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "Could't find review",
                    success: false
                })
            }
        } catch (error) {
            res.status(400).json({
                message: error.message,
                success: false
            })
        }
    },
}
module.exports = reviewController