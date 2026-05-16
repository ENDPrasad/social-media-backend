const Joi = require("joi");

const registerValidation = () => {
  return Joi.object({
    name: Joi.string().required(),

    email: Joi.string().email().required(),

    password: Joi.string().min(6).required(),
  });
};

const loginValidation = () => {
  return Joi.object({
    email: Joi.string().email().required(),

    password: Joi.string().required(),
  });
};

module.exports = {
  registerValidation,
  loginValidation,
};
