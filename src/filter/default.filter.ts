// import { Context } from '@midwayjs/koa';
import { Catch } from '@midwayjs/decorator';
import { StatusCode } from '../common/constant.common';

@Catch()
export default class DefaultErrorFilter {
  // async catch(err: Error, ctx: Context) {
  async catch(err: Error) {
    return { code: StatusCode.UN_ERROR, msg: err.message };
  }
}
