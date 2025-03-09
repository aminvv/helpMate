import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService, } from './auth.service';
import { TokenService } from './token.service';

@Module({
  imports:[UserModule,JwtModule],
  controllers: [AuthController],
  providers: [AuthService,TokenService],
  exports:[JwtModule]
})
export class AuthModule {}
