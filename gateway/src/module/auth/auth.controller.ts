import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto/create-auth.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { swaggerConsumes } from 'src/common/decorators/enums/swagger-consumes.enum';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}



  @ApiConsumes(swaggerConsumes.UrlEncoded)
  @Post('/signup-user')
  signup(@Body() SignupDto: SignupDto) {
    return this.authService.signup(SignupDto);
  }


  @ApiConsumes(swaggerConsumes.UrlEncoded)
  @Post('/login-user')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }


}
 