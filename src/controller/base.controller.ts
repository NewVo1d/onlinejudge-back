import { Body, Inject, Post, Query } from '@midwayjs/decorator';
import IdGenerater from '../utils/IdGenerater';
import { BaseEntity, BaseService } from '../utils/ImportHelper';

export default abstract class BaseController<T extends BaseEntity> {
  abstract getService(): BaseService<T>;

  @Inject()
  idGenerater: IdGenerater;

  @Post('/create')
  async create(@Body() body: T): Promise<T> {
    return this.getService().save(body);
  }

  @Post('/delete')
  async delete(@Query('id') id: number): Promise<boolean> {
    await this.getService().delete(id);
    return true;
  }

  @Post('/update')
  async update(@Body() body: T): Promise<T> {
    return this.getService().save(body);
  }

  @Post('/findById')
  async findById(@Query('id') id: number): Promise<T> {
    return this.getService().findById(id);
  }
}
