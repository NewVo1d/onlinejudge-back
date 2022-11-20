import { Provide } from '@midwayjs/decorator';

const bcrypt = require('bcryptjs');

@Provide('PasswordCoder')
export default class PasswordCoder {
  encrypt = (password: string) => {
    const salt = bcrypt.genSaltSync(5);
    const hash = bcrypt.hashSync(password, salt, 64);
    return '{bcrypt}' + hash;
  };
  decrypt = (password: string, hash: string) => {
    if (hash.indexOf('{bcrypt}') === 0) {
      hash = hash.slice(8);
    }
    return bcrypt.compareSync(password, hash);
  };
}
