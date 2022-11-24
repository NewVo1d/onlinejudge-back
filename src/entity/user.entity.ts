import { EntityModel } from '@midwayjs/orm';
import { Column } from 'typeorm';
import BaseEntity from './base.entity';

@EntityModel('user')
export default class UserEntity extends BaseEntity {
  @Column({ length: 30 })
  username: string;

  @Column({ length: 20, unique: true })
  email: string;

  @Column({ length: 11, unique: true, nullable: true })
  phone: string;

  @Column({ length: 100 })
  password: string;
}
