import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { RoleType } from "../../auth/enums/role.enum";
import { HydratedDocument, Types } from "mongoose";

@Schema({timestamps:true})
export class User {
    @Prop({required:false,unique:true})
    email:string
    @Prop({required:false,unique:true})
    phone:string
    @Prop({required:true})
    password:string
    @Prop({enum:RoleType.Patient})
    role:string
    @Prop({default:false})
    isVerified: boolean;
    @Prop()
    verifiedAt: Date;
    @Prop({ default: true })
    isActive: boolean;
    @Prop()
    otpCode: string;
    @Prop()
    otpExpire: Date;
    @Prop()
    refreshToken: string;

    @Prop({ type: Types.ObjectId, ref: 'Otp' }) 
    Otp: Types.ObjectId;
}

export type userDocument=HydratedDocument<User>
export const userSchema=SchemaFactory.createForClass(User)
