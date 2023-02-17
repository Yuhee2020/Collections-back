import {model, Schema} from "mongoose";
import {CommentType} from "../types";


const CommentSchema=new Schema<CommentType>({
    itemId: {type:String, required:true},
    text:{type:String, required:true},
    userId: {type: String,required:true},
    userName: {type: String,required:true},
    creationDate:{type: Date, required:true}
})

export default model<CommentType>("Comment", CommentSchema)
