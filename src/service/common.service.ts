import { Config, Inject, Provide } from '@midwayjs/decorator';
import { JwtService } from '@midwayjs/jwt';
import { RedisService } from '@midwayjs/redis';
import Assert from '../common/assert.common';
import { Constant, StatusCode } from '../common/constant.common';
import UserContext from '../common/usercontext.common';
import PasswordCoder from '../utils/PasswordCoder';
import { LoginDTO, RegisterDTO } from '../common/dto.common';
import UserService from './user.service';
import { LoginVO } from '../common/vo.common';
import UserEntity from './../entity/user.entity';

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

  async login(loginDTO: LoginDTO): Promise<LoginVO> {
    const user = await this.userService.findByEmail(loginDTO.email);
    Assert.notNull(user, StatusCode.UN_ERROR, '用户名或者密码错误');

    const isEqual = this.passwordCoder.decrypt(loginDTO.password, user.password);
    Assert.isTrue(isEqual, StatusCode.UN_ERROR, '用户名或者密码错误');

    const userContext: UserContext = new UserContext(user.id, user.username);
    const authorization = await this.jwtService.sign({ ...userContext });

    const key = Constant.TOKEN_NAME + ':' + user.id + ':' + authorization;
    const expiresIn = this.jwtConfig.expiresIn;
    this.redisService.set(key, JSON.stringify(userContext), 'EX', expiresIn);

    const loginVO = new LoginVO();
    loginVO.authorization = authorization;
    loginVO.expiresIn = expiresIn;
    return loginVO;
  }

  async register(registerDTO: RegisterDTO): Promise<boolean> {
    const user = new UserEntity();
    Object.assign(user, {
      ...registerDTO,
    });
    return this.userService.register(user);
  }
}
