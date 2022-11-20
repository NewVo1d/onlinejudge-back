import { join } from 'path';
import { Configuration, App } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as orm from '@midwayjs/orm';
import * as jwt from '@midwayjs/jwt';
import * as redis from '@midwayjs/redis';
import { DefaultErrorFilter, FormatMiddleware } from './utils/ImportHelper';
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
    this.app.useMiddleware([FormatMiddleware]);
    this.app.useFilter([DefaultErrorFilter]);
  }
}
