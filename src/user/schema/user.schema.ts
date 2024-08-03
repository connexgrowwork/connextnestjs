/* eslint-disable prettier/prettier */
// src/users/schemas/user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId, Types } from 'mongoose';

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

  @Prop()
  social_url: string;

  @Prop({ default: 0 })
  isNew: number;

  @Prop()
  device_token: string;

  @Prop()
  designation: string;

  @Prop()
  bio: string;

  @Prop()
  image: string;

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  followers: Types.ObjectId[]; // Array of User IDs

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  following: Types.ObjectId[]; // Array of User IDs

  @Prop({ type: [Types.ObjectId], ref: 'Post', default: [] })
  posts: Types.ObjectId[]; // Array of Post IDs
}

export const UserSchema = SchemaFactory.createForClass(User);
