/* eslint-disable prettier/prettier */
// src/posts/schemas/post.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId, Types } from 'mongoose';


@Schema({
    timestamps: true,
  })
export class Post {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false })
  userId: ObjectId; // ID of the user who created the post

  @Prop({ required: true })
  content: string; // Content of the post

  @Prop()
  imageUrl?: string; // Optional image URL

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  likes: Types.ObjectId[]; // Array of User IDs who liked the post

  @Prop({ type: [Types.ObjectId], ref: 'Comment', default: [] })
  comments: Types.ObjectId[];

}

export const PostSchema = SchemaFactory.createForClass(Post);
