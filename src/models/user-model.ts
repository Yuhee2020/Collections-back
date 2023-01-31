import {model, Schema} from "mongoose";
import {User} from "../types";


const UserSchema:Schema=new Schema({
    email: {type:String, required:true, unique:true},
    password:{type:String, required:true},
    isBlocked: {type:Boolean, required:true},
    registrationDate: {type:String, required:true},
    lastLoginDate:{type:String, required:true},
})

export default model<User>("User", UserSchema)