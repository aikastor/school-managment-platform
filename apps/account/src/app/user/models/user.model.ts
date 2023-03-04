import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { IUSer } from '@microservices/interfaces';
import { UserRole } from '@microservices/interfaces';

@Schema()
export class User extends Document implements IUSer {
  @Prop()
  displayname?: string;

  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true, enum: UserRole, type: String, default: UserRole.Student })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
