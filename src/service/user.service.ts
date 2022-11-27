import { Inject, Provide } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { UserInfoVO } from '../common/vo.common';
import UserEntity from '../entity/user.entity';
import PasswordCoder from '../utils/PasswordCoder';
import { BaseService } from './base.service';

@Provide()
export default class UserService extends BaseService<UserEntity> {
  @InjectEntityModel(UserEntity)
  model: Repository<UserEntity>;

  getModel(): Repository<UserEntity> {
    return this.model;
  }

  @Inject()
  ctx: Context;

  @Inject()
  passwordCoder: PasswordCoder;

  async save(user: UserEntity) {
    return super.save(user);
  }

  async register(user: UserEntity) {
    user.password = this.passwordCoder.encrypt(user.password);
    await super.save(user);
    return true;
  }

  async getUserInfo(): Promise<UserInfoVO> {
    const user = await super.findById(this.ctx.userContext.id);

    const userInfoVO = new UserInfoVO();
    userInfoVO.role = user.role;
    userInfoVO.email = user.email;
    userInfoVO.username = user.username;
    return userInfoVO;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.model.findOne({ where: { email } });
  }
}
