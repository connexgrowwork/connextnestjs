/* eslint-disable prettier/prettier */
// src/users/schemas/user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  socialId: string;

  @Prop({ default: 0 })
  isNew: number;

  @Prop()
  device_token: string;

  @Prop()
  bio: string;

  @Prop()
  image: string;

  @Prop({ default: [] })
  followers: string[]; // Array of User IDs

  @Prop({ default: [] })
  following: string[]; // Array of User IDs

  @Prop({ default: [] })
  posts: string[]; // Array of Post IDs
}

export const UserSchema = SchemaFactory.createForClass(User);
