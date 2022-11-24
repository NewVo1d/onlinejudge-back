import { Body, Controller, Inject, Post } from '@midwayjs/decorator';
import { Validate } from '@midwayjs/validate';
import CommonService from '../service/common.service';
import UserService from '../service/user.service';
import { LoginDTO, RegisterDTO } from '../common/dto.common';
import { LoginVO } from '../common/vo.common';

@Controller('/common')
export default class CommonController {
  @Inject()
  commonService: CommonService;

  @Inject()
  userService: UserService;

  @Validate()
  @Post('/login')
  async login(@Body() loginDTO: LoginDTO): Promise<LoginVO> {
    return this.commonService.login(loginDTO);
  }

  @Validate()
  @Post('/register')
  async register(@Body() registerDTO: RegisterDTO): Promise<boolean> {
    return this.commonService.register(registerDTO);
  }
}
