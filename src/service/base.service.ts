// src/common/BaseService.ts
import { Inject } from '@midwayjs/decorator';
import { In, Repository } from 'typeorm';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import BaseEntity from '../entity/base.entity';
import IdGenerater from '../utils/IdGenerater';

export abstract class BaseService<T extends BaseEntity> {
  @Inject()
  idGenerater: IdGenerater;

  abstract getModel(): Repository<T>;

  async save(o: T) {
    Object.assign(o, {
      id: this.idGenerater.generate(),
    });
    return this.getModel().save(o);
  }

  async delete(id: number) {
    return this.getModel().delete(id);
  }

  async findById(id: number): Promise<T> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.getModel().findOneBy({ id });
  }

  async findByIds(ids: number[]): Promise<T[]> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.getModel().findBy({ id: In(ids) });
  }

  async findOne(where: FindOptionsWhere<T>): Promise<T> {
    return this.getModel().findOne({ where });
  }
}
