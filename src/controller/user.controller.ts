import { Controller, Inject } from '@midwayjs/decorator';
import baseService from '../service/base.service';
import { UserEntity, BaseController, UserService } from '../utils/ImportHelper';

@Controller('/user')
export default class UserController extends BaseController<UserEntity> {
  @Inject()
  service: UserService;

  getService(): baseService<UserEntity> {
    return this.service;
  }
}
