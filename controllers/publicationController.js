const Publication = require('../models/Publication')
const Joi = require("joi");

const validator = Joi.object({
    title: Joi.string().min(4).max(100).required(),
    description: Joi.string().min(4).required(),
    date: Joi.date().required(),
    user: Joi.string().required(),
    category: Joi.string().min(4).max(40).required(),
    url: Joi.string().uri().message("INVALID_URL").required(),
    photo: Joi.string().uri().message("INVALID_URL").required(),
});

const validator2 = Joi.object({
    _id: Joi.string().required(),
    title: Joi.string().min(4).max(100).required(),
    description: Joi.string().min(4).required(),
    date: Joi.date().required(),
    category: Joi.string().min(4).max(40).required(),
    url: Joi.string().uri().message("INVALID_URL").required(),
    photo: Joi.string().uri().message("INVALID_URL").required(),
});

const publicationController = {
    update: async (req, res) => {

        const { id } = req.params;
        const publication = req.body;
        console.log(req.body)
        try {
            let result = await validator2.validateAsync(req.body);
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
        try {
            let result = await validator.validateAsync(req.body);
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
        if (req.query.category) {
            const queryString = new RegExp(`^${req.query.category}`)
            query.category = { $regex: queryString, $options: 'i' }
        }
        try {
            let publications = await Publication.find(query)
                .populate("user")
            if(publications){
                res.status(200).json({
                    message: "You get publications",
                    response: publications,
                    success: true
                })
            }else{
                res.status(404).json({
                    message: "Couldn't find publication",
                    success: false
                })
            }
            
        }
        catch (error) {
            console.log(err)
            res.status(500).json()
        }
    },
    read: async (req, res) => {
        const { id } = req.params;
        try {
            let publication = await Publication.findOne({ _id: id })
                .populate('user', ['_id', 'lastName', 'name', 'photo'])
            if (publication) {
                res.status(200).json({
                    message: "You get one publication",
                    response: publication,
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