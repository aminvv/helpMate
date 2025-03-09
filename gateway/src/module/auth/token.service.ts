import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokensPayload } from './types/payloadToken';


@Injectable()
export class TokenService {
  constructor(
    private jwtService:JwtService
  ) { }


  async createAccessTokenForUser(payload: TokensPayload) {
    const tokenAccess = this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_FOR_USER,
        expiresIn: "30d",
    })
    
    return tokenAccess
}

async refreshTokenForUser(payload: TokensPayload) {
  const refreshToken=this.jwtService.sign(payload,{
      secret:process.env.REFRESH_TOKEN_FOR_USER,
      expiresIn:"1y"
  })
  return refreshToken

}




}
