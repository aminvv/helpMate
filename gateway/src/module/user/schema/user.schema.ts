import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { RoleType } from "../../auth/enums/role.enum";
import { HydratedDocument, Types } from "mongoose";

@Schema({timestamps:true})
export class User {
    @Prop({
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      set: (v: string | undefined) => (typeof v === 'string' && v.trim() ? v.trim() : undefined),
    })
    email?: string;
  
    @Prop({
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      set: (v: string | undefined) => (typeof v === 'string' && v.trim() ? v.trim() : undefined),
    })
    phone?: string;
  
    @Prop({ required: true })
    password: string;
    
    @Prop({ enum: RoleType.Patient })
    role: string;
    
    @Prop({ default: false })
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
  
}

export type userDocument=HydratedDocument<User>
export const userSchema=SchemaFactory.createForClass(User)
