import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1668510062375_7473',
  koa: {
    port: 7001,
    globalPrefix: '/api',
  },
  orm: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging: true,
  },
  redis: {
    client: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      db: 0,
    },
  },
  jwt: {
    secret: 'setscrew',
    expiresIn: 60 * 60 * 24,
  },
  app: {
    security: {
      prefix: '/api/',
      ignore: ['/api/common'],
    },
  },
} as MidwayConfig;
