import {model, Schema} from "mongoose";
import {UserType} from "../types";


const UserSchema=new Schema<UserType>({
    email: {type:String, required:true, unique:true},
    password:{type:String},
    userName: {type: String},
    avatar: {type: String},
    role: { type: String,required: true },
    isBlocked: {type:Boolean, required:true},
    registrationDate: {type:String, required:true},
    lastLoginDate:{type:String, required:true},
    accessToken: {type: String},
    refreshToken: {type: String},
    collectionsCount: {type: Number, required: true},
    likes: {type: Number,},
    provider: {type: String},
    verified: {type: Boolean},
})

export default model<UserType>("User", UserSchema)


