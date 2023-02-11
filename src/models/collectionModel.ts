import {model, Schema} from "mongoose";
import {CollectionType} from "../types";


const CollectionSchema = new Schema<CollectionType>({
    userId: {type: String, required: true,},
    theme: {type: String, required: true},
    title: {type: String},
    description: {type: String},
    image: {type: String,},
    itemsCount: {type: Number},
    creationDate:{type:Date},
    itemsFields: [{type: String}],
})

export default model<CollectionType>("Collection", CollectionSchema)

