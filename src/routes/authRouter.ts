import {Router} from "express";
import {login, logOut, refresh, registration} from "../controllers/authController";
import {check} from "express-validator";

export const authRouter=Router();

authRouter.post('/registration',[
    check('email', "Email is required").notEmpty(),
    check('password', "Password is required").isLength({min:1})
], registration)
authRouter.post('/login',login)
authRouter.post('/refresh',refresh)
authRouter.post('/logout',logOut)


