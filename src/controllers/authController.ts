import {Request, Response,} from "express"
import User from "../models/user-model";
import jwt from "jsonwebtoken"
import {validationResult} from "express-validator";
import bcrypt from 'bcrypt'
import dayjs from "dayjs";


const secret = `${process.env.SECRET_KEY}`
const generateAccessToken = (id: string) => {
    const payload = {
        id
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

const registration = async (req: Request, res: Response) => {
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
            email, password: hashPassword,
            registrationDate: dayjs().format("DD-MMM-YYYY HH:mm:ss"), lastLoginDate: "no login attempts",
            isBlocked: false
        })
        await user.save()
        return res.status(201).json({message: "User successfully registered, try to login please", user})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Registration error"})
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({message: `User ${email} not found`})
        }
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(400).json({message: `Invalid password`})
        }
        if (user.isBlocked) {
            return res.status(400).json({message: `User is blocked`})
        }
        const date = dayjs().format("DD-MMM-YYYY HH:mm:ss")
        await User.updateOne({email}, {lastLoginDate: date})
        const token = generateAccessToken(user._id)
        const id = user._id
        const isBlocked = user.isBlocked
        return res.status(200).json({token, email, id, isBlocked})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Login error"})
    }
}

const authMe = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.body.user.id)
        const token = jwt.sign({id: user?._id}, secret, {expiresIn: "1h"})
        const email = user?.email
        const id = user?._id
        const isBocked = user?.isBlocked
        return res.json({token, email, id, isBocked})
    } catch (e) {
        console.log(e)
        return res.status(400).json({message: "Auth error"})
    }
}

export {registration, login, authMe}