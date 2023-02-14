import {model, Schema} from "mongoose";
import {TagType, UserType} from "../types";


const TagSchema=new Schema<TagType>({
    title: {type:String, required:true, unique:true},
})

export default model<TagType>("Tag", TagSchema)
