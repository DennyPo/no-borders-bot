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
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  AWS_REGION: Joi.string().required(),
  S3_BUCKET: Joi.string().required(),
  TELEGRAM_TOKEN: Joi.string().required(),
});
