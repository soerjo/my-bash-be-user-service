import * as dotenv from 'dotenv';
dotenv.config();
import { ConfigService, registerAs } from '@nestjs/config';
import * as Joi from 'joi';

interface IAppConfig {
  NODE_ENV: string;
  PORT: number;
  TZ: string;
  ENCRYPT_KEY: string;
  ROOT_ADMIN_NAME: string;
  ROOT_ADMIN_USERNAME: string;
  ROOT_ADMIN_EMAIL: string;
  ROOT_ADMIN_PASSWORD: string;
  DATABASE_URL: string;
  PRIVATE_KEY: string;
  PUBLIC_KEY: string;
  EMAIL_FROM: string;
  EMAIL_PASSWORD: string;
  STATIC_KEY: string;
}

const configService = new ConfigService();
const configs: IAppConfig = {
  NODE_ENV: configService.get(`NODE_ENV`),
  PORT: configService.get(`PORT`),
  TZ: configService.get(`TZ`),
  ENCRYPT_KEY: configService.get(`ENCRYPT_KEY`),
  ROOT_ADMIN_NAME: configService.get(`ROOT_ADMIN_NAME`),
  ROOT_ADMIN_USERNAME: configService.get(`ROOT_ADMIN_USERNAME`),
  ROOT_ADMIN_EMAIL: configService.get(`ROOT_ADMIN_EMAIL`),
  ROOT_ADMIN_PASSWORD: configService.get(`ROOT_ADMIN_PASSWORD`),
  DATABASE_URL: configService.get(`DATABASE_URL`),
  PRIVATE_KEY: configService.get(`PRIVATE_KEY`),
  PUBLIC_KEY: configService.get(`PUBLIC_KEY`),
  EMAIL_FROM: configService.get(`EMAIL_FROM`),
  EMAIL_PASSWORD: configService.get(`EMAIL_PASSWORD`),
  STATIC_KEY: configService.get(`STATIC_KEY`),
};

const schema = Joi.object<IAppConfig>({
  NODE_ENV: Joi.string().valid('development', 'production', 'test', 'local').required(),
  PORT: Joi.number().optional(),
  TZ: Joi.string().optional(),
  ENCRYPT_KEY: Joi.string().required(),
  ROOT_ADMIN_NAME: Joi.string().required(),
  ROOT_ADMIN_USERNAME: Joi.string().required(),
  ROOT_ADMIN_EMAIL: Joi.string().email().required(),
  ROOT_ADMIN_PASSWORD: Joi.string().required(),
  DATABASE_URL: Joi.string().required(),
  PRIVATE_KEY: Joi.string().required(),
  PUBLIC_KEY: Joi.string().required(),
  EMAIL_FROM: Joi.string().required(),
  EMAIL_PASSWORD: Joi.string().required(),
  STATIC_KEY: Joi.string().required(),
});

export default registerAs('app_configs', () => {
  const { value, error } = schema.validate(configs, { abortEarly: false });

  if (error) {
    throw new Error(
      `Validation failed - Is there an environment variable missing? \n ${error.message.split('.').join('\n')}`,
    );
  }

  return value;
});
