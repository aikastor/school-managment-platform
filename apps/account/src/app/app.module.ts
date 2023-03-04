import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { getMongoCongfig } from './congifs';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.account/env' }),
    MongooseModule.forRootAsync(getMongoCongfig()),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
