import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { mongoConfig } from './config/mongoose.config';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { cwd } from 'process';


@Module({
  imports: [AuthModule,UserModule,MongooseModule.forRoot(mongoConfig.uri),
    ConfigModule.forRoot({envFilePath:join(cwd(),".env"),isGlobal:true})
  ],

})
export class AppModule {}
