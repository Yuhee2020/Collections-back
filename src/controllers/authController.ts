import {Request, Response,} from "express"
import User from "../models/userModel";
import {validationResult} from "express-validator";
import bcrypt from 'bcrypt'
import dayjs from "dayjs";
import {
    generateAccessToken,
    generateRefreshToken,
    refreshSecret
} from "../service/token-service";
import {REFRESH_TOKEN_AGE_MS} from "../constants";
import jwt from "jsonwebtoken";
import {getGoogleOauthToken, getGoogleUser} from "../service/session";
import dotenv from "dotenv";

dotenv.config()

const clientAuthUrl=process.env.CLIENT_AUTH_URL

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
            collectionsCount: 0,
            likes: 0,
        })
        await user.save()
        return res.status(201).json({
            message: "User successfully registered, try to login please",
            user
        })
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
        const accessToken = generateAccessToken(user._id)
        const refreshToken = generateRefreshToken(user._id)
        const loggedUser = await User.findByIdAndUpdate(user._id, {
            lastLoginDate: dayjs().format("DD-MMM-YYYY HH:mm:ss"),
            accessToken,
            refreshToken,
        }, {new: true})

        res.cookie("refreshToken", refreshToken, {
            maxAge: REFRESH_TOKEN_AGE_MS,
            sameSite: "none",
            secure: true,
            httpOnly: true
        })
        return res.status(200).json({loggedUser})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Login error"})
    }
}

export const logOut = async (req: Request, res: Response) => {
    try {
        const {refreshToken} = req.cookies
        const outUser = await User.findOneAndUpdate({refreshToken}, {
            refreshToken: "",
            accessToken: ""
        }, {new: true})
        res.clearCookie("refreshToken")
        return res.status(200).json({message: "Logout success", outUser})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Logout error"})
    }
}

export const refresh = async (req: Request, res: Response) => {
    try {
        const {refreshToken} = req.cookies
        if (!refreshToken) {
            return res.status(401).json({error: "Unauthorized"})
        }
        const userData = jwt.verify(refreshToken, refreshSecret)
        const user = await User.findOne({refreshToken})
        if (!userData || !user?.refreshToken) {
            return res.status(401).json({error: "Unauthorized"})
        }
        const newAccessToken = generateAccessToken(user._id)
        const newRefreshToken = generateRefreshToken(user._id)
        const loggedUser = await User.findByIdAndUpdate(user._id, {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        }, {new: true})

        res.cookie("refreshToken", newRefreshToken,
            {
                maxAge: REFRESH_TOKEN_AGE_MS,
                sameSite: "none",
                secure: true,
                httpOnly: true
            })
        return res.status(200).json({loggedUser})

    } catch (e) {
        console.log(e)
        res.status(400).json({message: "authorization error"})
    }
}

export const googleOauthHandler = async (req: Request, res: Response,) => {
    try {
        const code = req.query.code as string;
        const pathUrl = (req.query.state as string) || '/';
        console.log(pathUrl)
        if (!code) {
            return res.status(401).json({message: "Authorization code not provided!"})
        }
        const {id_token, access_token} = await getGoogleOauthToken({code});
        const {name, verified_email, email} = await getGoogleUser({
            id_token,
            access_token,
        });
        if (!verified_email) {
            return res.status(401).json({message: "Google account not verified"})
        }

        const user = await User.findOne({email})
        if (!user) {
            const user = new User({
                email,
                userName: name,
                registrationDate: dayjs().format("DD-MMM-YYYY HH:mm:ss"),
                lastLoginDate: "no login attempts",
                isBlocked: false,
                avatar: "",
                role: "user",
                accessToken: "",
                refreshToken: "",
                collectionsCount: 0,
                likes: 0,
                provider: 'Google',
                verified: true
            })
            const newUser = await user.save()
            const accessToken = generateAccessToken(newUser._id)
            const refreshToken = generateRefreshToken(newUser._id)
            await User.findOneAndUpdate(
                {email},
                {
                    lastLoginDate: dayjs().format("DD-MMM-YYYY HH:mm:ss"),
                    accessToken,
                    refreshToken,
                }
            );
            res.cookie("refreshToken", refreshToken,
                {
                    maxAge: REFRESH_TOKEN_AGE_MS,
                    sameSite: "none",
                    secure: true,
                    httpOnly: true
                })
            return res.redirect(`${clientAuthUrl}`);
        }
        const accessToken = generateAccessToken(user._id)
        const refreshToken = generateRefreshToken(user._id)
        await User.findOneAndUpdate(
            {email},
            {
                email,
                lastLoginDate: dayjs().format("DD-MMM-YYYY HH:mm:ss"),
                isBlocked: false,
                userName: email,
                accessToken,
                refreshToken,
            },
        );
        res.cookie("refreshToken", refreshToken, {
                maxAge: REFRESH_TOKEN_AGE_MS,
                sameSite: "none",
                secure: true,
                httpOnly: true
            })
        return res.redirect(`${clientAuthUrl}`);
    } catch (err: any) {
        console.log('Failed to authorize Google User', err);
        return res.redirect(`${clientAuthUrl}/error`);
    }
};
