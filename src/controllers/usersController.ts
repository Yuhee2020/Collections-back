import User from "../models/user-model";
import {Request, Response,} from "express"

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Users error"})
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const {usersId} = req.body
        usersId.map(async (userId:string)=>{
            await User.findByIdAndRemove(userId)
        })
        const users = await User.find()
        res.status(202).json({message: `Deleted successfully`, users})

    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Delete error"})
    }
}

export const blockUser = async (req: Request, res: Response) => {
    try {
        const {usersId} = req.body
        usersId.map(async (id: string) => {
            await User.findByIdAndUpdate({_id: id}, {isBlocked: true});
        })
        const users = await User.find()
        res.status(200).json({message: "Successfully blocked", users})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Block error"})
    }
}

export const unlockUser = async (req: Request, res: Response) => {
    try {
        const {usersId} = req.body
        usersId.map(async (id: string) => {
            await User.findByIdAndUpdate({_id: id}, {isBlocked: false});
        })
        const users = await User.find()
        res.status(200).json({message: 'Successfully unlocked', users})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Unlock error"})
    }
}



