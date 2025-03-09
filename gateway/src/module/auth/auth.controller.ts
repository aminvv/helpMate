import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, ResendOtpDto, SignupDto } from './dto/create-auth.dto';
import { ApiConsumes, ApiProperty, ApiTags } from '@nestjs/swagger';
import { swaggerConsumes } from 'src/common/decorators/enums/swagger-consumes.enum';

@ApiTags("Auth")
export class LogoutDto {
  @ApiProperty()
  phone: string;
}
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}



  @ApiConsumes(swaggerConsumes.UrlEncoded)
  @Post('/signup-user')
  signup(@Body() SignupDto: SignupDto) {
    console.log("Received SignupDto:", SignupDto);
    return this.authService.signup(SignupDto);
  }


  @ApiConsumes(swaggerConsumes.UrlEncoded)
  @Post('/login-user')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }


  @ApiConsumes(swaggerConsumes.UrlEncoded)
  @Post('/resend-Otp')
  resendOtp(@Body() resendOtpDto: ResendOtpDto) {
    return this.authService.resendOtp(resendOtpDto);
  }

  @ApiConsumes(swaggerConsumes.UrlEncoded)
  @Post('/logout')
  logOut(@Body() phone: LogoutDto) {
    return this.authService.logOut(phone);
  }


}
 