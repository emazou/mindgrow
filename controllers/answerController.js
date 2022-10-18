const Answer = require('../models/Answer')
const Joi = require("joi");
const validator = Joi.object({
    user: Joi.object().required(),
    answer: Joi.string().min(1).max(300).required(),
    question: Joi.string().required()
})
const answerController = {
    allAnswers: async (req, res) => {
        try {
            let answers = await Answer.find()
                .populate('user', { name: 1, lastName: 1, photo: 1, country: 1 })
                .populate('question')
            if (answers) {
                res.status(200).json({
                    message: 'You get answers',
                    response: answers,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "Could't find answers",
                    success: false
                })
            }
        } catch (error) {
            res.status(400).json({
                message: 'error',
                success: false
            })
        }
    },
    createAnswer: async (req, res) => {
        const { answer, question } = req.body
        const user = req.user.id
        try {
            let result = await validator.validateAsync({ answer, user, question });
            await new Answer({ answer, user, question }).save()
            res.status(201).json({
                message: 'answer created',
                success: true
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: 'answer not created',
                success: false
            })
        }
    },
    getAnswer: async (req, res) => {
        const { id } = req.params
        try {
            let answer = await Answer.findOne({ question: id })
            if (answer) {
                res.status(200).json({
                    message: 'You get one answer',
                    response: answer,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "Could't find answer",
                    success: false
                })
            }
        } catch (error) {
            res.status(400).json({
                message: 'error',
                success: false
            })
        }
    },
    modifyAnswer: async (req, res) => {
        const { id } = req.params
        const { answer } = req.body
        try {
            let answerdb = await Answer.findOneAndUpdate({ _id: id }, { answer }, { new: true })
            if (answerdb) {
                res.status(200).json({
                    message: 'You modified one answer',
                    answer: answerdb,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "Could't find answer",
                    success: false
                })
            }
        } catch (error) {
            res.status(400).json({
                message: 'error',
                success: false
            })
        }
    },
    deleteAnswer: async (req, res) => {
        const { id } = req.params
        try {
            let answer = await Answer.findOneAndDelete({ _id: id })
            if (answer) {
                res.status(200).json({
                    message: 'You deleted one answer',
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "Could't find answer",
                    success: false
                })
            }
        } catch (error) {
            res.status(400).json({
                message: 'error',
                success: false
            })
        }
    },
}
module.exports = answerController