import {Request, Response} from "express";
import Item from "../models/itemModel";


export const createItem = async (req: Request, res: Response) => {
    try {
        const item = req.body
        const newItem = new Item({
            ...item,
            itemCreationDate: Date.now(),
            likesCount: 0,
        })
        await newItem.save()
        const collectionId = item.collectionId
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

export const getLastItems = async (req: Request, res: Response) => {
    try {
        const allItems = await Item.find()
        const items = allItems.reverse()
        return res.status(200).json({message: "success", items})
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
            .find({$or: [{description: reg}, {author: reg}, {producer: reg},{historyOfCreation: reg},{tags: reg}]})
        return res.status(200).json({message: "success", items})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Get item error"})
    }
}
