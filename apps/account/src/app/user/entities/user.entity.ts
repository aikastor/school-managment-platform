import { compare, genSalt, hash } from 'bcryptjs';

import { IUSer, UserRole } from '@microservices/interfaces';

export class UserEntity implements IUSer {
  _id?: string;
  displayName?: string;
  email: string;
  passwordHash: string;
  role: UserRole;

  constructor(user: IUSer) {
    this._id = user._id;
    this.displayName = user.displayName;
    this.email = user.email;
    this.role = user.role;
    this.passwordHash = user.passwordHash;
  }

  public async setPassword(password: string) {
    const salt = await genSalt(10);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public validatePassword(password: string) {
    return compare(password, this.passwordHash);
  }
}
