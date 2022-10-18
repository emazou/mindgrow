const Comment = require('../models/Comment')

const commentController = {
    update: async (req, res) => {
        const { id } = req.params;
        const comment = req.body;
        try {
            let newComment = await Comment.findOneAndUpdate(
                { _id: id }, comment, { new: true });
            if (comment) {
                res.status(200).json({
                    message: "Your comment is update",
                    response: newComment,
                    success: true,
                });
            } else {
                res.status(404).json({
                    message: "We couldn't update your comment",
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
            let comment = await Comment.findOneAndDelete({ _id: id });
            if (comment) {
                res.status(200).json({
                    message: "Your comment is deleted",
                    response: comment,
                    success: true,
                });
            } else {
                res.status(404).json({
                    message: "We couldn't delete your comment",
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
        const { comment, user } = req.body
        try {
            await new Comment(req.body).save()
            res.status(201).json({
                message: 'comment created',
                success: true
            })
        } catch (error) {
            res.status(400).json({
                message: "could't create comment",
                success: false
            })
        }
    },
    all: async (req, res) => {
        let query = {}
        if (req.query.user) {
            query.user = req.query.user
        }
        if (req.query.publications) {
            query.publications = req.query.publications
        }
        try {
            let comments = await Comment.find(query)
                .populate("user")
                .populate("publication")
            res.status(200).json({
                message: "you get comments",
                response: comments,
                success: true
            })
        }
        catch (error) {
            console.log(err)
            res.status(500).json()
        }
    },
    read: async (req, res) => {
        const { publicationsid } = req.params
        try {
            let comments = await Comment.find({ publication: publicationsid })
                .populate('user', ['_id', 'lastName', 'name', 'photo'])
            if (comments) {
                res.status(200).json({
                    message: "You get comments",
                    response: comments,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "Couldn't find comments",
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


module.exports = commentController