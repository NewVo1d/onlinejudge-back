import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
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
  passwordCoder: PasswordCoder;

  async save(user: UserEntity) {
    return super.save(user);
  }

  async register(user: UserEntity) {
    user.password = this.passwordCoder.encrypt(user.password);
    await super.save(user);
    return true;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.model.findOne({ where: { email } });
  }
}
