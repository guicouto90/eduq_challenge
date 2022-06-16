import joi from 'joi';

export const userSchemaPost = joi.object({
  email: joi.string().email().required(),
  role: joi.string().valid('PREMIUM_USER', 'DEFAULT_USER').required(),
  products: joi.array().required()
})

export const userSchemaPut = joi.object({
  productId: joi.string().valid('123456', '987654').required()
})