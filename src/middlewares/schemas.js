const Joi = require('joi');

const createProductSchema = Joi.object({
  name: Joi.string().required().min(5).label('name'),
}).messages({
  'any.required': '{{#label}} is required',
  'string.min': '{{#label}} length must be at least {{#limit}} characters long',
});

/*
Schema feito com base nesta mentoria:
https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/live-lectures/3013dcdc-9314-44e3-8df6-8f7c37e64bcd/recording/d4ff6eea-2acc-41b2-be7b-c76f08ded305
*/

const createSaleSchema = Joi.array().items(Joi.object({
  productId: Joi.number().required().min(1).label('productId'),
  quantity: Joi.number().required().min(1).label('quantity'),
}).messages({
  'any.required': '{{#label}} is required',
  'string.min': '{{#label}} must be greater than or equal to {{#limit}}',
}));

module.exports = { createProductSchema, createSaleSchema };
