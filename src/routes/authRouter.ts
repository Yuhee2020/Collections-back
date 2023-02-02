import {Router} from "express";
import {authMiddleware} from "../middleware/authMiddleware";
import {login, logOut, refresh, registration} from "../controllers/authController";
import {blockUser, deleteUser, getUsers, unlockUser} from "../controllers/usersController";
import {check} from "express-validator";

export const authRouter=Router();

authRouter.post('/registration',[
    check('email', "Email is required").notEmpty(),
    check('password', "Password is required").isLength({min:1})
], registration)
authRouter.post('/login',login)
authRouter.post('/refresh',refresh)
authRouter.post('/logout',logOut)
authRouter.get('/auth',authMiddleware)
authRouter.get('/users',authMiddleware, getUsers)
authRouter.put('/delete', deleteUser)
authRouter.put('/block', blockUser)
authRouter.put('/unlock', unlockUser)

