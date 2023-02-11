import User from "../models/userModel";
import {Request, Response,} from "express"

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
        console.log(usersId)
        usersId.map(async (userId: string) => {
            await User.findByIdAndRemove(userId)
        })
        const users = await User.find()
        res.status(202).json({message: `Deleted successfully`, users})

    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Delete error"})
    }
}

export const blockUsers = async (req: Request, res: Response) => {
    try {
        const usersId = req.body
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

export const unlockUsers = async (req: Request, res: Response) => {
    try {
        const usersId = req.body
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

export const changeRole = async (req: Request, res: Response) => {
    try {
        const usersId = req.body
        usersId.map(async (id: string) => {
            const user = await User.findById({_id: id})
            user?.role === "admin"
                ? await User.findByIdAndUpdate({_id: id}, {role: "user"})
                : await User.findByIdAndUpdate({_id: id}, {role: "admin"});
        })
        const users = await User.find()
        res.status(200).json({message: 'Role changed', users})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Change role error"})
    }
}



