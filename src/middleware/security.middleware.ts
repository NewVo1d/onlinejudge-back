import { Config, Inject, Middleware } from '@midwayjs/decorator';
import { JwtService } from '@midwayjs/jwt';
import { RedisService } from '@midwayjs/redis';
import { httpError, IMiddleware } from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/koa';
import { Constant } from '../common/constant.common';
import { UserContext } from '../common/context.common';

@Middleware()
export default class SecurityMiddleware implements IMiddleware<Context, NextFunction> {
  @Inject()
  jwtService: JwtService;

  @Inject()
  redisService: RedisService;

  @Config('app.security')
  securityConfig;

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      if (!ctx.headers['authorization']) {
        throw new httpError.UnauthorizedError(Constant.TOKEN_INVALID);
      }

      const parts = ctx.get('authorization').trim().split(' ');
      if (parts.length !== 2) {
        throw new httpError.UnauthorizedError(Constant.TOKEN_INVALID);
      }

      const [scheme, token] = parts;
      if (!/^Bearer$/i.test(scheme)) {
        throw new httpError.UnauthorizedError(Constant.TOKEN_INVALID);
      }

      const jwt = await this.jwtService.verify(token, { complete: true });
      const payload = jwt['payload'];
      const key = Constant.TOKEN_NAME + ':' + payload.id + ':' + token;
      const userContextStr = await this.redisService.get(key);
      const userContext: UserContext = JSON.parse(userContextStr);
      if (payload.email !== userContext.email) {
        throw new httpError.UnauthorizedError(Constant.TOKEN_INVALID);
      }
      ctx.userContext = userContext;

      return next();
    };
  }

  public match(ctx: Context): boolean {
    const { path } = ctx;
    const { prefix, ignore } = this.securityConfig;
    const exist = ignore.find(item => {
      return path.match(item);
    });
    return path.indexOf(prefix) === 0 && !exist;
  }

  static getName(): string {
    return 'SECURITY';
  }
}
