// src/middleware/format.middleware.ts
import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';
import { StatusCode } from '../common/constant.common';

/**
 * 对接口返回的数据统一包装
 */
@Middleware()
export default class FormatMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const result = await next();
      return { code: StatusCode.OK, msg: 'OK', data: result };
    };
  }

  match(ctx) {
    return ctx.path.indexOf('/api') === 0;
  }

  static getName(): string {
    return 'FORMAT';
  }
}
