import { Config, Inject, Middleware } from '@midwayjs/decorator';
import { JwtService } from '@midwayjs/jwt';
import { RedisService } from '@midwayjs/redis';
import { httpError, IMiddleware } from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/koa';
import { Constant } from '../common/constant.common';
import UserContext from '../common/usercontext.common';

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
      const ucStr = await this.redisService.get(key);
      const uc: UserContext = JSON.parse(ucStr);
      if (payload.username !== uc.username) {
        throw new httpError.UnauthorizedError(Constant.TOKEN_INVALID);
      }
      ctx.userContext = uc;

      return next();
    };
  }

  ignore(ctx: Context) {
    const { path } = ctx;
    const { ignore } = this.securityConfig;
    return path.indexOf(ignore) === 0;
  }

  static getName(): string {
    return 'SECURITY';
  }
}
