import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { mongoConfig } from './config/mongoose.config';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';


@Module({
  imports: [AuthModule,UserModule,MongooseModule.forRoot(mongoConfig.uri)],

})
export class AppModule {}
