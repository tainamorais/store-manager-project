const Joi = require('joi');

const createProductSchema = Joi.object({
  name: Joi.string().required().min(5).label('name'),
}).messages({
  'any.required': '{{#label}} is required',
  'string.min': '{{#label}} length must be at least {{#limit}} characters long',
});

module.exports = { createProductSchema };
