import { Controller, Get, Inject } from '@midwayjs/decorator';
import { UserInfoVO } from '../common/vo.common';
import UserService from '../service/user.service';

@Controller('/user')
export default class UserController {
  @Inject()
  userService: UserService;

  @Get('/userinfo')
  async userInfo(): Promise<UserInfoVO> {
    return this.userService.getUserInfo();
  }
}
