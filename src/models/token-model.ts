import {model, Schema} from "mongoose";


const TokenSchema:Schema=new Schema({
    user: {type:Schema.Types.ObjectId, ref:'User'},
    refreshToken:{type:String, required:true},
})

export default model("User", TokenSchema)