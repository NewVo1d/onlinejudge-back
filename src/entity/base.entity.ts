import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';

export default class BaseEntity {
  @PrimaryColumn({ type: 'bigint' })
  id: number;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
