const Publication = require('../models/Publication')
const Joi = require("joi");

const validator = Joi.object({
    title: Joi.string().min(4).max(40),
    description: Joi.string().min(4).max(500),
    password: Joi.string().strip(),
    date: Joi.date().less('now'),
    user: Joi.string(),
    category: Joi.string().min(4).max(40),
    url: Joi.string().uri().message("INVALID_URL"),
    photo: Joi.string().uri().message("INVALID_URL"),
});

const publicationController = {
    update: async (req, res) => {
        let result = await validator.validateAsync(req.body);

        const { id } = req.params;
        const publication = req.body;
        try {
            let newPublication = await Publication.findOneAndUpdate(
                { _id: id },
                publication,
                { new: true }
            );
            if (newPublication) {
                res.status(200).json({
                    message: "Your publication is update",
                    response: newPublication,
                    success: true,
                });
            } else {
                res.status(404).json({
                    message: "We couldn't update your publication",
                    success: false,
                });
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: error.message,
                success: false,
            });
        }
    },
    destroy: async (req, res) => {
        const { id } = req.params;
        try {
            let publication = await Publication.findOneAndDelete({ _id: id });
            if (publication) {
                res.status(200).json({
                    message: "Your publication is deleted",
                    response: publication,
                    success: true,
                });
            } else {
                res.status(404).json({
                    message: "We couldn't delete your publication",
                    success: false,
                });
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: "error",
                success: false,
            });
        }
    },
    create: async (req, res) => {
        let result = await validator.validateAsync(req.body);

        try {
            let publication = await new Publication(req.body).save()
            if(publication){
                res.status(201).json({
                    message: 'Publication created',
                    success: true,
                })
            }else{
                res.status(404).json({
                    message: "Publication not created",
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
    readAll: async (req, res) => {
        let query = {}
        if (req.query.user) {
            query.user = req.query.user
        }
        try {
            let publications = await Publication.find(query)
                .populate("user")
            res.status(200).json({
                message: "You get publications",
                response: publications,
                success: true
            })
        }
        catch (error) {
            console.log(err)
            res.status(500).json()
        }
    },
    read: async (req, res) => {
        const { id } = req.params;
        try {
            let publications = await Publication.findOne({ _id: id })
                .populate('user', ['_id', 'lastName', 'name', 'photo'])
            if (publications) {
                res.status(200).json({
                    message: "You get one publication",
                    response: publications,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "Couldn't find publication",
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
    },
}


module.exports = publicationController