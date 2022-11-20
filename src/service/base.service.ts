import { Inject } from '@midwayjs/decorator';
import { Repository } from 'typeorm';
import IdGenerater from './../utils/IdGenerater';
import { BaseEntity } from '../utils/ImportHelper';

export default abstract class BaseService<T extends BaseEntity> {
  abstract getModel(): Repository<T>;

  @Inject()
  idGenerater: IdGenerater;

  async save(t: T) {
    if (!t.id) t.id = this.idGenerater.generate();
    return this.getModel().save(t);
  }

  async delete(id: number) {
    return this.getModel().delete(id);
  }

  async findById(id: number | any): Promise<T> {
    return this.getModel().findOneBy({ id });
  }
}
