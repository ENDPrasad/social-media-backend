const Joi = require("joi");

const idRegex = /^[a-fA-F0-9]{24}$/;

const idValidation = () => {
    return Joi.object({
        id: Joi.string()
            .length(24)
            .pattern(idRegex)
            .required()
            .messages({
                "string.pattern.base": "Invalid ObjectId format"
        })
    });
};


module.exports = {
  idValidation
};