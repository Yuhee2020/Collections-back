import {Request, Response} from "express";
import Tag from "../models/tagModel";
import {TagType} from "../types";

export const createTags = async (req: Request, res: Response) => {
    try {
        const tags = req.body
        tags.map(async (tag:TagType)=>{
            const newTag=new Tag(tag)
            await newTag.save()
        })
        const allTags=await Tag.find()
        return res.status(201).json({message: "tags created",allTags})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Create tags error"})
    }
}

export const getTags = async (req: Request, res: Response) => {
    try {
        const tags = await Tag.find()
        return res.status(200).json({message: "success", tags})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Registration error"})
    }
}