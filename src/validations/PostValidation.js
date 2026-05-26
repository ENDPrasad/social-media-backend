const Joi = require("joi");


const newPostValidation = () =>{
    return Joi.object({
        content: Joi.string()
            .required()
            .trim()
            .min(2)
            .max(1000)
            .messages({
                "strin.empty": "Content is required"
            }),
    });
};


const newCommentValidation = () =>{
    return Joi.object({
        comment: Joi.string()
            .required()
            .trim()
            .min(2)
            .max(1000)
            .messages({
                "string.empty": "Comment is required"
            }),
    });
};


module.exports = {
    newPostValidation,
    newCommentValidation,
};