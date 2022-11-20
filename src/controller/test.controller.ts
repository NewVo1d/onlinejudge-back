import { Controller, Get, Post } from '@midwayjs/decorator';

@Controller('/test')
export default class TestController {
  @Get('/get')
  async get() {
    return 'This is a GET Method';
  }
  @Post('/post')
  async post() {
    return 'This is a POST Method';
  }
}
