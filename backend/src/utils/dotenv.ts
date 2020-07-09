import * as dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(__dirname, '..', '..', '.env');

dotenv.config({ path: envPath });

const variables = ['DATABASE_URL', 'PORT', 'FROM_EMAIL', 'FROM_PASSWORD'];

variables.forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`${name}: ${process.env[name]}`);
  }
});

const env = {
  DATABASE_URL: process.env.DATABASE_URL || '',
  PORT: process.env.PORT || '3333',
  FROM_EMAIL: process.env.FROM_EMAIL || '',
  FROM_PASSWORD: process.env.FROM_PASSWORD || '',
};

export default env;
