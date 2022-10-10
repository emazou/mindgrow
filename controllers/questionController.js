const Question = require('../models/Question')
const Joi = require('joi')

const validator = Joi.object({
    question: Joi.string().min(4).max(300).required(),
    user: Joi.required(),
    product: Joi.required()
})
const questionController = {
    readAll: async (req, res) => {
        let query ={}
        if (req.query.product) {
            query.product = req.query.product
        }
        try {
            let questions = await Question.find(query)
                .populate('user', { _id: 1, name: 1, lastName: 1, photo: 1, country: 1 })
                .populate('product')
            if (questions) {
                res.status(200).json({
                    message: 'You get questions',
                    response: questions,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "Could't find questions",
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
        const { question, product } = req.body
        const user = req.user.id
        console.log(user)
        try {
            let result = await validator.validateAsync({ question, user, product });
            await new Question({ question, user, product }).save()
            res.status(201).json({
                message: 'Question created',
                success: true
            })
        } catch (error) {
            console.log(error.message)
            res.status(400).json({
                message: 'Question not created',
                success: false
            })
        }
    },
    update: async (req, res) => {
        const { id } = req.params
        const { question } = req.body
        try {
            let questiondb = await Question.findOneAndUpdate({ _id: id }, { question }, { new: true })
            if (questiondb) {
                res.status(200).json({
                    message: 'You modified one question',
                    response: questiondb,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "Could't find question",
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
            let question = await Question.findOneAndDelete({ _id: id })
            if (question) {
                res.status(200).json({
                    message: 'You deleted one question',
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "Could't find question",
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
module.exports = questionController