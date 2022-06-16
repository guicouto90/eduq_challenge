import joi from 'joi';

export const salesSchemaPost = joi.object({
  serviceKey: joi.string().required(),
  buyerEmail: joi.string().email().required(),
  productId: joi.string().valid('123456', '987654').required() 
})

export const salesSchemaPut = joi.object({
  productId: joi.string().valid('123456', '987654').required()
})