import {Request, Response,} from "express"
import Collection from "../models/collectionModel";


export const createCollection = async (req: Request, res: Response) => {
    try {
        const collection = req.body
        const newCollection = new Collection({
            ...collection,
            creationDate: Date.now()
        })
        await newCollection.save()
        return res.status(201).json({message: "Collection successfully created",})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Create collection error"})
    }
}

export const getUserCollections = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params
        const userCollections = await Collection.find({userId})
        return res.status(200).json({message: "success", userCollections})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Registration error"})
    }
}

export const getCollection= async (req: Request, res: Response) => {
    try {
        const {collectionId} = req.params
        console.log(collectionId)
        const collection = await Collection.findById(collectionId)
        return res.status(200).json( collection)
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Registration error"})
    }
}

export const deleteCollection = async (req: Request, res: Response) => {
    try {
        const {collectionId} = req.params
        console.log(collectionId)
        const deletedCollection = await Collection.findByIdAndRemove(collectionId)
        return res.status(202).json({message: "deleted successfully", deletedCollection})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Registration error"})
    }
}

export const editCollection = async (req: Request, res: Response) => {
    try {
        console.log(req.body.image)
        const {theme, title, description, image, itemsFields, _id} = req.body
        const updatedCollection = await Collection.findByIdAndUpdate(_id,
            {theme, title, description, image, itemsFields},{new:true})
        return res.status(200).json({message: "Collection successfully edited", updatedCollection})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Create collection error"})
    }
}

