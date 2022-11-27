import '@midwayjs/core';
import { UserContext } from './common/context.common';

declare module '@midwayjs/core' {
  interface Context {
    userContext: UserContext;
  }
}
