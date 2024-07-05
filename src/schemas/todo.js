const Joi = require("joi");

exports.createTodoScema= Joi.object({
    user_id:Joi.string()
    .min(36)
    .required(),
    guide_id:Joi.string()
    .min(36)
    .required()
})