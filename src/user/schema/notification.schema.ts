/* eslint-disable prettier/prettier */
// src/users/schemas/user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Notification {
  @Prop()
  text: string;

  @Prop({ default: 0 })
  isActive: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: ObjectId;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
