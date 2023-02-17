import {model, Schema} from "mongoose";
import {ItemType} from "../types";



const ItemSchema = new Schema<ItemType>({
    collectionId: {type: String, required: true},
    collectionName:{type: String, required: true},
    userId: {type: String, required: true},
    title: {type: String, required:true},
    likesCount: {type: Number},
    commentsCount: {type: Number},
    usersIdWhoLiked:[{type:String}],
    tags:[{type:String}],
    itemCreationDate:{type:Date},
    image: {type: String},
    productionDate:{type:Date},
    dateOfCreation:{type:Date},
    dateOfWriting:{type:Date},
    author: {type: String},
    producer: {type: String},
    countryOfOrigin: {type: String},
    price: {type: Number},
    weight: {type: Number},
    numberOfCopies: {type: Number},
    description: {type: String},
    historyOfCreation: {type: String},
    uniqueCharacteristics:{type:String},
    isUniqueItem:{type:Boolean},
    isAvailableForSale:{type:Boolean},
    isAvailableForExchange:{type:Boolean},
})


export default model<ItemType>("Item", ItemSchema)

