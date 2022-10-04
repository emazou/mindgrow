const User = require("../models/User");
const crypto = require("crypto");
const bcryptjs = require("bcryptjs");
const sendMail = require("./sendMail");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const validator = Joi.object({
    name: Joi.string().min(4).max(40),
    lastName: Joi.string().min(4).max(40),
    photo: Joi.string().uri().message("INVALID_URL"),
    mail: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().strip(),
    country: Joi.string().min(4).max(40),
    from: Joi.string(),
    role: Joi.string().valid("user", "admin"),
});

const userController = {
    signUp: async (req, res) => {
        let result = await validator.validateAsync(req.body);
        let { name, photo, mail, password, role, from, lastName, country } =
            req.body;
        try {
            let user = await User.findOne({ mail });
            if (!user) {
                let logged = false;
                let verified = false;
                let code = crypto.randomBytes(15).toString("hex");
                if (from === "form") {
                    (password = bcryptjs.hashSync(password, 10)),
                        (user = await new User({
                            name,
                            photo,
                            mail,
                            password: [password],
                            role,
                            from: [from],
                            logged,
                            verified,
                            code,
                            lastName,
                            country,
                        }).save());
                    sendMail(mail, code);
                    res.status(201).json({
                        message: "User signed up from page",
                        response: user,
                        success: true,
                        id: user._id,
                    });
                } else {
                    (password = bcryptjs.hashSync(password, 10)),
                        (verified = true);
                    user = await new User({
                        name,
                        photo,
                        mail,
                        password: [password],
                        role,
                        from: [from],
                        logged,
                        verified,
                        code,
                        lastName,
                        country,
                    }).save();
                    res.status(201).json({
                        message: "User signed up from " + from,
                        response: user,
                        success: true,
                        id: user._id,
                    });
                }
            } else {
                if (user.from.includes(from)) {
                    res.status(200).json({
                        message: "User already registered " + from,
                        response: user,
                        success: false,
                    });
                } else {
                    user.from.push(from);
                    user.verified = true;
                    password = bcryptjs.hashSync(password, 10);
                    user.password.push(password);
                    await user.save();
                    res.status(201).json({
                        message: "User signed up from " + from,
                        response: user,
                        success: true,
                        id: user._id,
                    });
                }
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: error.message,
                success: false,
            });
        }
    },
    verifyMail: async (req, res) => {
        const { code } = req.params;
        try {
            let user = await User.findOne({ code });
            if (user) {
                user.verified = true;
                await user.save();
                res.status(200).redirect("http://localhost:3000/signin");
            } else {
                res.status(404).json({
                    message: "Email hasn't account yet",
                    success: false,
                });
            }
        } catch (error) {
            res.status(400).json({
                message: "Couldn't verify account",
                success: false,
            });
        }
    },
    signIn: async (req, res) => {
        const { mail, password, from } = req.body;
        try {
            const user = await User.findOne({ mail });
            if (!user) {
                res.status(404).json({
                    message: "User doesn't exist, please sign up",
                    success: false,
                });
            } else if (user.verified) {
                const checkPass = user.password.filter((passwordUser) =>
                    bcryptjs.compareSync(password, passwordUser)
                );
                if (from == "form") {
                    if (checkPass.length > 0) {
                        user.logged = true;
                        await user.save();
                        const loginUser = {
                            id: user._id,
                            name: user.name,
                            mail: user.mail,
                            role: user.role,
                            from: user.from,
                            photo: user.photo,
                        };
                        const token = jwt.sign({ id: user._id }, process.env.KEY_JWT, { expiresIn: 60 * 60 * 24 });
                        res.status(200).json({
                            response: { user: loginUser, token: token },
                            message: "Welcome to Mind-Grow " + user.name,
                            success: true,
                        });
                    } else {
                        res.status(400).json({
                            message: "Sorry, Username or password incorrect",
                            success: false,
                        });
                    }
                } else {
                    const loginUser = {
                        id: user._id,
                        name: user.name,
                        mail: user.mail,
                        role: user.role,
                        from: user.from,
                        photo: user.photo,
                    };
                    user.logged = true;
                    await user.save();
                    const token = jwt.sign({ id: user._id }, process.env.KEY_JWT, { expiresIn: 60 * 60 * 24 });
                    res.status(200).json({
                        response: { user: loginUser, token: token },
                        message: "Welcome to Mind-Grow " + user.name,
                        success: true,
                        mail: user.mail,
                    });
                }
            } else {
                res.status(401).json({
                    message: "Please, verify your email account and try again",
                    success: false,
                });
            }
        } catch (error) {
            console.log(error);
            res.status(401).json({
                message: "Sign in ERROR, try again later",
                success: false,
            });
        }
    },
    verifyToken: (req, res) => {
        if (!req.err) {
            const token = jwt.sign({ id: req.user.id }, process.env.KEY_JWT, {
                expiresIn: 60 * 60 * 24,
            });
            res.status(200).json({
                success: true,
                response: {
                    user: req.user,
                    token: token,
                },
                message: "Welcome " + req.user.name + "!",
            });
        } else {
            res.json({
                success: false,
                message: "sign in please!",
            });
        }
    },
    signOut: async (req, res) => {
        const id = req.params.id;
        const body = req.body;

        try {
            let updated = await User.findByIdAndUpdate(id, body);

            if (updated) {
                updated.logged = false;
                await updated.save();
                res.status(200).json({
                    message: "Log out successfully",
                    success: true,
                });
            } else {
                res.status(404).json({
                    message: "Couldnt'log out",
                    success: false,
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
    read: async (req, res) => {
        const { id } = req.params;
        try {
            let user = await User.findOne({ _id: id });
            if (user) {
                res.status(200).json({
                    message: "You get one user",
                    response: user,
                    success: true,
                });
            } else {
                res.status(404).json({
                    message: "Couldn't find user",
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
    readAll: async (req, res) => {
        let users;
        let query = {};

        if (req.query.users) {
            query.users = req.query.users;
        }

        try {
            users = await User.find(query);

            res.status(200).json({
                message: "you get all users",
                response: users,
                succes: true,
            });
        } catch (error) {
            res.status(500).json;
        }
    }
};
module.exports = userController;