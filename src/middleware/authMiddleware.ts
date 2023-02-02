import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {accessSecret} from "../service/token-service";


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const token = req.headers.authorization
            ? req.headers.authorization.split(' ')[1]
            : '';
        if (!token) {
            return res.status(401).json({error: "Unauthorized"});
        }
        req.body.tokenData = jwt.verify(token, accessSecret);
        next()
    } catch (e) {
        console.log(e)
        return res.status(401).json({error: "Unauthorized"})
    }
}