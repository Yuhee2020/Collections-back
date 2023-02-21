import User from "../models/userModel";
import {Request, Response,} from "express"
import Collection from "../models/collectionModel";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Users error"})
    }
}

export const deleteUsers = async (req: Request, res: Response) => {
    try {
        const usersId = req.body
        await usersId.map(async (userId: string) => {
            await User.findByIdAndRemove(userId)
        })
        await usersId.map(async (userId:string)=>{
            await Collection.deleteMany({userId})
        })

        const users = await User.find()

        res.status(202).json({message: `Deleted successfully`, users})

    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Delete error"})
    }
}

export const updateUsers = async (req: Request, res: Response) => {
    try {
        const updatedUsers = req.body
        for (const updatedUser of updatedUsers) {
            await User.findByIdAndUpdate({_id: updatedUser.id}, {...updatedUser})
        }
        const users = await User.find()
        res.status(200).json({message: "Successfully updated",users})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Block error"})
    }
}




