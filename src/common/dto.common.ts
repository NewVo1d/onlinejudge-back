import { Rule, RuleType } from '@midwayjs/validate';

export class LoginDTO {
  @Rule(RuleType.string().email().required())
  email: string;
  @Rule(RuleType.string().min(6).max(20).required())
  password: string;
}

export class RegisterDTO {
  @Rule(RuleType.string().max(30).required())
  username: string;
  @Rule(RuleType.string().email().required())
  email: string;
  @Rule(RuleType.string().min(6).max(20).required())
  password: string;
}
