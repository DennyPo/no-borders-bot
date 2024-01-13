import Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  PORT: Joi.number().required(),
  DATABASE_URL: Joi.string().required(),
  API_KEY: Joi.string().required(),
  GRPC_URL: Joi.string().required(),
  KAFKA_URL: Joi.string().required(),
});
