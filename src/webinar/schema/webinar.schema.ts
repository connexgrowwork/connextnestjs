/* eslint-disable prettier/prettier */
// src/posts/schemas/post.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { ObjectId, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Webinar {
  @Prop()
  fullName: string;

  @Prop({ default: 0 })
  isActive: number;

  @Prop()
  description: string;

  @Prop()
  startDate: string;

  @Prop()
  image: string;

  @Prop()
  endDate?: string;

  @Prop()
  paymentUrl?: string;
}

export const WebinarSchema = SchemaFactory.createForClass(Webinar);
