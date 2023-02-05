import {Request, Response,} from "express"
import User from "../models/user-model";
import {validationResult} from "express-validator";
import bcrypt from 'bcrypt'
import dayjs from "dayjs";
import {generateAccessToken, generateRefreshToken, refreshSecret} from "../service/token-service";
import {REFRESH_TOKEN_AGE_MS} from "../constants";
import jwt from "jsonwebtoken";



export const registration = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message: "Registration error"})
        }
        const {email, password} = req.body
        const candidate = await User.findOne({email})
        if (candidate) {
            return res.status(400).json({message: 'Username is not unique'})
        }
        const hashPassword = bcrypt.hashSync(password, 7);
        const user = new User({
            email,
            password: hashPassword,
            registrationDate: dayjs().format("DD-MMM-YYYY HH:mm:ss"),
            lastLoginDate: "no login attempts",
            isBlocked: false,
            userName: email,
            avatar: "",
            role: "user",
            accessToken: "",
            refreshToken: "",
            reviewsCount: 0,
            likes: 0,
        })
        await user.save()
        return res.status(201).json({message: "User successfully registered, try to login please", user})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Registration error"})
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({message: `User ${email} not found`})
        }
        const isValidPassword = bcrypt.compareSync(password, user.password)
        if (!isValidPassword) {
            return res.status(400).json({message: `Invalid password`})
        }
        if (user.isBlocked) {
            return res.status(400).json({message: `User is blocked`})
        }
        const accessToken =generateAccessToken(user._id)
        const refreshToken =generateRefreshToken(user._id)
        const loggedUser= await User.findByIdAndUpdate(user._id, {
            lastLoginDate: dayjs().format("DD-MMM-YYYY HH:mm:ss"),
            accessToken,
            refreshToken,
        },{new:true})

       res.cookie("refreshToken", refreshToken, {maxAge:REFRESH_TOKEN_AGE_MS, httpOnly:true})
        return res.status(200).json({loggedUser})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Login error"})
    }
}

export const logOut = async (req: Request, res: Response) => {
    try {
        const {refreshToken}=req.cookies
        const outUser=await User.findOneAndUpdate({refreshToken}, {refreshToken: "", accessToken:""},{new:true})
        res.clearCookie("refreshToken")
        return res.status(200).json({message:"Logout success",outUser})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Logout error"})
    }
}

export const refresh = async (req: Request, res: Response) => {
    try {
        const {refreshToken}=req.cookies
        console.log(refreshToken)
        if(!refreshToken){
            return res.status(401).json({error:"Unauthorized"})
        }
        const userData=jwt.verify(refreshToken,refreshSecret)
        const user = await User.findOne({refreshToken})
        if(!userData || !user?.refreshToken){
            return res.status(401).json({error:"Unauthorized"})
        }
        const newAccessToken =generateAccessToken(user._id)
        const newRefreshToken =generateRefreshToken(user._id)
        const loggedUser= await User.findByIdAndUpdate(user._id, {
            accessToken:newAccessToken,
            refreshToken:newRefreshToken,
        },{new:true})

        res.cookie("refreshToken", newRefreshToken, {maxAge:REFRESH_TOKEN_AGE_MS, httpOnly:true})
        return res.status(200).json({loggedUser})

    } catch (e) {
        console.log(e)
        res.status(400).json({message: "authorization error"})
    }
}


// export const authMe = async (req: Request, res: Response) => {
//     try {
//         const user = await User.findById(req.body.user.id)
//         const token = jwt.sign({id: user?._id}, secret, {expiresIn: "1h"})
//         const email = user?.email
//         const id = user?._id
//         const isBocked = user?.isBlocked
//         return res.json({token, email, id, isBocked})
//     } catch (e) {
//         console.log(e)
//         return res.status(400).json({message: "Auth error"})
//     }
// }

