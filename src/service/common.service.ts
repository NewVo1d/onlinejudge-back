import { Config, Inject, Provide } from '@midwayjs/decorator';
import { JwtService } from '@midwayjs/jwt';
import { RedisService } from '@midwayjs/redis';
import Assert from '../common/assert.common';
import { Constant, StatusCode } from '../common/constant.common';
import UserContext from '../common/usercontext.common';
import { UserEntity, UserService } from '../utils/ImportHelper';
import PasswordCoder from '../utils/PasswordCoder';

@Provide()
export default class CommonService {
  @Inject()
  userService: UserService;

  @Inject()
  jwtService: JwtService;

  @Inject()
  redisService: RedisService;

  @Inject()
  passwordCoder: PasswordCoder;

  @Config('jwt')
  jwtConfig;

  async login(prop: UserEntity) {
    const user = await this.userService.findByUsername(prop.username);
    Assert.notNull(user, StatusCode.UN_ERROR, '用户名或者密码错误');
    const flag = this.passwordCoder.decrypt(prop.password, user.password);
    Assert.isTrue(flag, StatusCode.UN_ERROR, '用户名或者密码错误');
    const uc: UserContext = new UserContext(user.id, user.username);
    const at = await this.jwtService.sign({ ...uc });
    const key = Constant.TOKEN_NAME + ':' + user.id + ':' + at;
    const expiresIn = this.jwtConfig.expiresIn;
    this.redisService.set(key, JSON.stringify(uc), 'EX', expiresIn);
    return { authorization: at, expiresIn: expiresIn };
  }
}
