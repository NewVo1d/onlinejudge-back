import { Controller, Inject } from '@midwayjs/decorator';
import UserService from '../service/user.service';

@Controller('/user')
export default class UserController {
  @Inject()
  userService: UserService;
}
