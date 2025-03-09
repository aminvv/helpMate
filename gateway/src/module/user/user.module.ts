import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schema/user.schema';
import { Otp, otpSchema } from './schema/otp.schema';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[MongooseModule.forFeature([{name:User.name,schema:userSchema},{name:Otp.name,schema:otpSchema}])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService,MongooseModule],
})
export class UserModule {}
