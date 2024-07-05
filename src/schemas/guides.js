const Joi = require("joi");

exports.createGuideSchema=Joi.object({
    title:Joi.string()
    .min(4)
    .max(50)
    .required()
    .trim(),
    content:Joi.string()
    .max(1000)
    .required()
    .trim(),
    notify:Joi.boolean()

})

exports.editGuideSchema=Joi.object({
    title:Joi.string()
    .min(4)
    .max(50)
    .required()
    .trim(),
    content:Joi.string()
    .max(1000)
    .required()
    .trim(),
    notify:Joi.boolean()

})