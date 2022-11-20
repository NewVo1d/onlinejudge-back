import '@midwayjs/core';
import UserContext from './common/usercontext.common';

declare module '@midwayjs/core' {
  interface Context {
    userContext: UserContext;
  }
}
