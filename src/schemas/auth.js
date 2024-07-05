const Joi = require("joi");

exports.loginSchema=Joi.object({
    username:Joi.string()
    .min(4)
    .message('login must be at least 4 characters long')
    .required(),
    password:Joi.string().min(4).required(),
});