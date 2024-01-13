import Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  PORT: Joi.number().required(),
  TELEGRAM_TOKEN: Joi.string().required(),
  BACKEND_API_KEY: Joi.string().required(),
  OWNER_ID: Joi.number().required(),
  BACKEND_GRPC_URL: Joi.string().required(),
  KAFKA_URL: Joi.string().required(),
});
