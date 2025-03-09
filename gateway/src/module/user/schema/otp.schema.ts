import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({timestamps:true})
export class Otp {
    @Prop()
     code:string
    @Prop({required:false,unique:true, })
    phone:string
    @Prop({required:false,unique:true,  })
    email:string
    @Prop()
    expiresIn:Date


}

export type otpDocument=HydratedDocument<Otp>
export const otpSchema=SchemaFactory.createForClass(Otp)
