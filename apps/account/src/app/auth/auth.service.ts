import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@microservices/interfaces';

import { UserEntity } from '../user/entities';
import { UserRepository } from '../user/repositories';
import { RegisterDto } from './auth.controller';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository, private readonly jwtService: JwtService) {}

  async register({ email, password, displayName }: RegisterDto) {
    const oldUSer = await this.userRepository.findUser(email);

    if (oldUSer) throw new Error('User alsready exists!');

    const newUserEntity = await new UserEntity({
      displayName,
      email,
      role: UserRole.Student,
      passwordHash: '',
    }).setPassword(password);
    const newUser = await this.userRepository.createUser(newUserEntity);

    return { email: newUser.email };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findUser(email);
    if (!user) throw new Error('Invalid login or password!');

    const userEntity = new UserEntity(user);
    const isPasswordValid = userEntity.validatePassword(password);

    if (!isPasswordValid) throw new Error('Invalid login or password!');

    return { id: user._id };
  }

  async login(id: string) {
    return {
      access_token: await this.jwtService.signAsync({ id }),
    };
  }
}
