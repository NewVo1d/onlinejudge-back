import { join } from 'path';
import { Configuration, App } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as orm from '@midwayjs/orm';
import * as jwt from '@midwayjs/jwt';
import * as redis from '@midwayjs/redis';
import * as dotenv from 'dotenv';
import FormatMiddleware from './middleware/format.middleware';
import DefaultErrorFilter from './filter/default.filter';
import SecurityMiddleware from './middleware/security.middleware';

dotenv.config();
@Configuration({
  imports: [
    redis,
    jwt,
    orm,
    koa,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  async onReady() {
    this.app.useMiddleware([SecurityMiddleware, FormatMiddleware]);
    this.app.useFilter([DefaultErrorFilter]);
  }
}
