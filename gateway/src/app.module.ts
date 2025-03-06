import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { mongoConfig } from './config/mongoose.config';

@Module({
  imports: [MongooseModule.forRoot(mongoConfig.uri)],

})
export class AppModule {}
