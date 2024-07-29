/* eslint-disable prettier/prettier */
// src/comments/schemas/comment.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({ required: true })
  postId: string; // ID of the post being commented on

  @Prop({ required: true })
  userId: string; // ID of the user who made the comment

  @Prop({ required: true })
  content: string; // Comment content

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
