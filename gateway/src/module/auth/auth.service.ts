import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto, SignupDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, userDocument } from '../user/schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { randomInt } from 'crypto';
import { Otp, otpDocument } from '../user/schema/otp.schema';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<userDocument>,
    @InjectModel(Otp.name) private otpModel: Model<otpDocument>,
  ) { }






  async signup(SignupDto: SignupDto) {
    const { email, password, phone } = SignupDto
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

    const otp = randomInt(10000, 99999).toString()
    const expiresIn = new Date(Date.now() + 2 * 60 * 1000)

    await this.otpModel.create({
      code: otp,
      expiresIn: expiresIn,
      phone,
      email,
    })


    return { message: 'Signup successful, please verify your OTP' };




  }

  async login(loginDto:LoginDto){
    const {email,password,phone}=loginDto
     const existUser=await this.userModel.findOne({
      $or: [{ phone: phone }, { email: email }]
     })
     if(!existUser){
      throw new BadRequestException("user not found")
     }
     const matchPass= bcrypt.compare(password,existUser.password)
     if(!matchPass){
      throw new  BadRequestException("invalid phone or email or password")
     }
     return{
      message:"login successfully"
     }

  }
}
