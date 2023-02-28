import {Request, Response} from "express";
import Item from "../models/itemModel";
import Collection from "../models/collectionModel";
import Comment from "../models/commentModel"
import User from "../models/userModel";


export const createItem = async (req: Request, res: Response) => {
    try {
        const item = req.body
        const newItem = new Item({
            ...item,
            itemCreationDate: Date.now(),
            likesCount: 0,
            commentsCount:0,
        })
        await newItem.save()
        const collectionId = item.collectionId
        const collection= await Collection.findById({_id: collectionId})
        console.log(collection)
        if(collection) {
            await Collection.findByIdAndUpdate
            (collectionId, {itemsCount:collection.itemsCount + 1},{new:true})
        }
        const items = await Item.find({collectionId})
        return res.status(201).json({message: "Item successfully created", items})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Create item error"})
    }
}

export const getCollectionItems = async (req: Request, res: Response) => {
    try {
        const {collectionId} = req.params
        const items = await Item.find({collectionId})
        return res.status(200).json({message: "success", items})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Get items error"})
    }
}

export const getItems = async (req: Request, res: Response) => {
    try {
        const {text} = req.query
        if (text) {
            const textF: string = text as string | undefined || "";
            const reg = new RegExp(textF, 'gi')
            const itemsFromItem = await Item
                .find({
                    $or: [{description: reg}, {title: reg}, {author: reg}, {producer: reg},
                        {historyOfCreation: reg}, {countryOfOrigin: reg}, {uniqueCharacteristics: reg}, {tags: reg}]
                })
            const comments= await Comment.find({text:reg})
            const commentsItemsId=comments.map(comment=>
                comment.itemId
            )
            const commentsItems=[]
            for (const commentItemsId of commentsItemsId) {
                const item =await Item.findById(commentItemsId)
                commentsItems.push(item)
            }

            const items = [...itemsFromItem,...commentsItems].filter((item, index, obj) =>
                obj.indexOf(item) && obj.lastIndexOf(item)
            );
            return res.status(200).json({message: "success", items})
        } else {
            const allItems = await Item.find()
            const items = allItems.reverse()
            return res.status(200).json({message: "success", items})
        }
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Get items error"})
    }
}

export const deleteItems = async (req: Request, res: Response) => {
    try {
        const {itemsId, collectionId} = req.body
        for (const itemId of itemsId) {
            await Item.findByIdAndDelete(itemId)
        }
        const items = await Item.find({collectionId})
        return res.status(202).json({message: "items deleted", items})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Delete item error"})
    }
}

export const editItem = async (req: Request, res: Response) => {
    try {
        const item = req.body
        const updatedItem = await Item.findByIdAndUpdate(item._id, item, {new: true})
        return res.status(200).json({message: "item updated", updatedItem})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Edit item error"})
    }
}

export const getItem = async (req: Request, res: Response) => {
    try {
        const {itemId} = req.params
        const item = await Item.findById(itemId)
        return res.status(200).json({message: "success", item})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Get item error"})
    }
}

export const findItems = async (req: Request, res: Response) => {
    try {

        const {text} = req.query
        const textF: string = text as string | undefined || "";
        const reg = new RegExp(textF, 'gi')
        const items = await Item
            .find({$or: [{description: reg}, {author: reg}, {producer: reg}, {historyOfCreation: reg}, {tags: reg}]})
        return res.status(200).json({message: "success", items})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Get item error"})
    }
}
