import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { UserEntity, BaseService } from '../utils/ImportHelper';
import PasswordCoder from '../utils/PasswordCoder';

@Provide()
export default class UserService extends BaseService<UserEntity> {
  @InjectEntityModel(UserEntity)
  model: Repository<UserEntity>;

  @Inject()
  passwordCoder: PasswordCoder;

  getModel(): Repository<UserEntity> {
    return this.model;
  }

  async register(user: UserEntity) {
    user.password = this.passwordCoder.encrypt(user.password);
    return super.save(user);
  }

  async findByUsername(username: string): Promise<UserEntity> {
    return this.model.findOne({ where: { username } });
  }
}
