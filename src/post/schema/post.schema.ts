/* eslint-disable prettier/prettier */
// src/posts/schemas/post.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema({
    timestamps: true,
  })
export class Post {
  @Prop({ required: true })
  userId: string; // ID of the user who created the post

  @Prop({ required: true })
  content: string; // Content of the post

  @Prop()
  imageUrl?: string; // Optional image URL

  @Prop({ default: [] })
  likes: string[]; // Array of User IDs who liked the post

  @Prop({ default: [] })
  comments: string[]; // Array of Comment IDs

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
