import { Body, Config, Controller, Inject, Post } from '@midwayjs/decorator';
import { UserService } from '../utils/ImportHelper';
import { RedisService } from '@midwayjs/redis';
import { UserEntity } from '../utils/ImportHelper';
import { Constant, StatusCode } from '../common/constant.common';
import Assert from '../common/assert.common';
import PasswordCoder from '../utils/PasswordCoder';
import UserContext from '../common/usercontext.common';
import { JwtService } from '@midwayjs/jwt';

@Controller('/common')
export default class CommonController {
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

  @Post('/login')
  async login(@Body() prop: UserEntity) {
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

  @Post('/register')
  async register(@Body() user: UserEntity): Promise<UserEntity> {
    return this.userService.register(user);
  }
}
