import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto, ResendOtpDto, SignupDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, userDocument } from '../user/schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { randomInt } from 'crypto';
import { Otp, otpDocument } from '../user/schema/otp.schema';
import { TokenService } from './token.service';
import { LogoutDto } from './auth.controller';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<userDocument>,
    @InjectModel(Otp.name) private otpModel: Model<otpDocument>,
    private tokenService: TokenService,
  ) { }






    async signup(SignupDto: SignupDto) {
      const { email, password, phone } = SignupDto
      const searchCriteria: any = {};
  if (email?.trim()) searchCriteria.email = email.trim();
  if (phone?.trim()) searchCriteria.phone = phone.trim();

  if (Object.keys(searchCriteria).length === 0) {
    throw new BadRequestException('Either email or phone must be provided');
  }
      const existUser = await this.userModel.findOne({
        $or: [{ phone: phone }, { email: email }]
      })
      if (existUser) {
        throw new BadRequestException(" user already exist")
      }
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = await this.userModel.create({
        email,
        phone,
        password: hashedPassword,
      })

      const accessToken=await this.tokenService.createAccessTokenForUser({id:user._id.toString()})
      const refreshToken=await this.tokenService.refreshTokenForUser({id:user._id.toString()})
      const otp = randomInt(10000, 99999).toString()
      const expiresIn = new Date(Date.now() + 2 * 60 * 1000)

      await this.otpModel.create({
        code: otp,
        expiresIn: expiresIn,
        phone,
        email,
      })


      return {
         message: 'Signup successful, please verify your OTP',
          accessToken,
          refreshToken
       };




    }


  async login(loginDto: LoginDto) {
    const { email, password, phone } = loginDto
    const existUser = await this.userModel.findOne({
      $or: [{ phone: phone }, { email: email }]
    })
    if (!existUser) {
      throw new BadRequestException("user not found")
    }
    const matchPass = bcrypt.compare(password, existUser.password)
    if (!matchPass) {
      throw new BadRequestException("invalid phone or email or password")
    }
    const accessToken = await this.tokenService.createAccessTokenForUser({ id: existUser._id.toString() })
    const refreshToken = await this.tokenService.refreshTokenForUser({ id: existUser._id.toString() })
    return {
      message: "login successfully",
      accessToken,
      refreshToken
    }

  }


  async logOut(phone: LogoutDto) {
    const user = await this.userModel.findOne({ phone })
    if (!user) {
      throw new BadRequestException("user not found ")
    }
    await this.userModel.updateOne(
      { _id: user._id},
      { $set: { refreshToken: "" } }
    );


  }

  async resendOtp(resendOtpDto: ResendOtpDto) {
    const { email, phone } = resendOtpDto;

    const searchCriteria = email ? { email } : phone ? { phone } : null;

    if (!searchCriteria) {
      throw new BadRequestException('Either email or phone must be provided');
    }

    const userOtp = await this.otpModel.findOne(searchCriteria);

    if (!userOtp) {
      throw new BadRequestException('User not found');
    }

    if (!userOtp) {
      throw new BadRequestException("User not found");
    }

    if (userOtp.expiresIn > new Date()) {
      throw new BadRequestException("Please wait before requesting a new OTP");
    }

    const newOtp = randomInt(10000, 99999).toString();
    const expiresIn = new Date(Date.now() + 2 * 60 * 1000)

    await this.otpModel.updateOne(
      { _id: userOtp._id },
      {
        $set: {
          code: newOtp,
          expiresIn,
        },
      }
    )

    return {
      message: "OTP sent successfully",
      newOtp
    }
  }


}
