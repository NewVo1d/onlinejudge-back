import { EntityModel } from '@midwayjs/orm';
import { Column } from 'typeorm';
import { BaseEntity } from '../utils/ImportHelper';

@EntityModel('user')
export default class UserEntity extends BaseEntity {
  @Column({ length: 30, unique: true })
  username: string;

  @Column({ length: 100 })
  password: string;
}
