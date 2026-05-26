const Joi = require("joi");


const nameRegex = /^[a-zA-Z\s'-]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const registerValidation = () => {
  return Joi.object({
    name: Joi.string()
      .required()
      .trim()
      .min(2)
      .max(50)
      .pattern(nameRegex)
      .messages({
        "string.pattern.base": "Name can only contains letters",
        "string.empty": "Name is required"
      }),

    email: Joi.string()
      .email()
      .required()
      .pattern(emailRegex)
      .messages({
        "string.pattern.base": "Please provide valid email format",
        "string.empty": "Email is required"
      }),

    password: Joi.string()
    .min(8)
    .required()
    .messages({
      "string.empty": "Password is required"
    }),
  });
};

const loginValidation = () => {
  return Joi.object({
    email: Joi.string()
      .email()
      .required()
      .pattern(emailRegex)
      .messages({
        "string.pattern.base": "Please provide valid email format",
        "string.empty": "Email is required"
      }),

    password: Joi.string()
    .min(8)
    .required()
    .messages({
      "string.empty": "Password is required"
    }),
  });
};

module.exports = {
  registerValidation,
  loginValidation,
};
