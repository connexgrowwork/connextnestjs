/* eslint-disable prettier/prettier */
// src/comments/schemas/comment.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId, Types } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema({
  timestamps: true,
})
export class Comment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: false })
  postId: ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false })
  userId: ObjectId;

  @Prop({ required: true })
  content: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
