/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { WebinarService } from './webinar.service';
import { WebinarController } from './webinar.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WebinarSchema } from './schema/webinar.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Webinar', schema: WebinarSchema }]),
  ],
  controllers: [WebinarController],
  providers: [WebinarService],
})
export class WebinarModule {}
