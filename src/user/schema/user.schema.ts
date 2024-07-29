/* eslint-disable prettier/prettier */
// src/users/schemas/user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  profilePicture?: string;

  @Prop({ default: [] })
  followers: string[];

  @Prop({ default: [] })
  following: string[];

  @Prop({ default: [] })
  posts: string[]; // Array of Post IDs
}

export const UserSchema = SchemaFactory.createForClass(User);