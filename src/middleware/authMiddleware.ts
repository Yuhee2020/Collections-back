import jwt from "jsonwebtoken";
import {NextFunction, Request, Response} from "express";

const secret = `${process.env.SECRET_KEY}`

export const authMiddleware = (req:Request, res:Response, next:NextFunction) => {

    if(req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: 'No token'})
        }
        req.body.user = jwt.verify(token, secret)
        next()
    } catch (e) {
        return res.status(401).json({message: 'Auth token error'})
    }
}