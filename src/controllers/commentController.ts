import {Request, Response} from "express";
import Comment from "../models/commentModel";
import Item from "../models/itemModel";


export const createComment = async (req: Request, res: Response) => {
    try {
        const comment = req.body
        const newComment=new Comment({
            ...comment,
            creationDate: Date.now()
        })
        await newComment.save()
        const item=await Item.findById({_id:comment.itemId})
        if(item) {
            const updatedItem = await Item.findByIdAndUpdate(comment.itemId,
                {commentsCount:item.commentsCount+1},{new:true}
            )
            console.log(updatedItem)
        }
        const comments=await Comment.find({itemId:comment.itemId})
        return res.status(201).json({message: "comment added",comments})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Create comment error"})
    }
}

export const getComments = async (req: Request, res: Response) => {
    try {
        const {itemId} = req.params
        const comments = await Comment.find({itemId})
        return res.status(200).json({message: "success", comments})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "get comments error"})
    }
}
