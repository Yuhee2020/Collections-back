import jwt from "jsonwebtoken";
import {ACCESS_TOKEN_AGE, REFRESH_TOKEN_AGE} from "../constants";
import dotenv from "dotenv";


dotenv.config()

export const accessSecret=process.env.JWT_ACCESS_SECRET as string
export const refreshSecret=process.env.JWT_REFRESH_SECRET as string

export const generateAccessToken = (id: string) => {
    return jwt.sign({id}, accessSecret, {expiresIn: ACCESS_TOKEN_AGE})
}

export const generateRefreshToken = (id: string) => {
    return jwt.sign({id}, refreshSecret, {expiresIn: REFRESH_TOKEN_AGE})
}