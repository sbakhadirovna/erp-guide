const Joi = require("joi");

exports.createUserScema=Joi.object({
    firstName:Joi.string()
    .min(3)
    .required(), 
    lastName:Joi.string()
    .min(3)
    .required(),  
    age:Joi.number()
    .positive()
    .required(),
     Role:Joi.string()
     .valid('admin','employee')
     .required(), 
     username:Joi.string()
     .alphanum()
     .min(3)
     .max(20)
     .required(), 
     password:Joi.string()
     .min(4)
     .max(12)
     .required()
})

exports.editUserScema=Joi.object({
    firstName:Joi.string()
    .min(3)
    .required(), 
    lastName:Joi.string()
    .min(3)
    .required(),  
    age:Joi.number()
    .positive()
    .required(),
     Role:Joi.string()
     .valid('admin','employee')
     .required(), 
     username:Joi.string()
     .alphanum()
     .min(4)
     .max(20)
     .required(), 
    //  password:Joi.string()
    //  .min(4)
    //  .max(12)
    //  .required()
})