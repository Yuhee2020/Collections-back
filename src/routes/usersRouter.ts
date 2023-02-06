import {Router} from "express";
import {authMiddleware} from "../middleware/authMiddleware";
import {blockUsers, changeRole, deleteUsers, getUsers, unlockUsers} from "../controllers/usersController";

export const usersRouter=Router();

usersRouter.get('/getUsers',authMiddleware, getUsers)
usersRouter.put('/delete',authMiddleware, deleteUsers)
usersRouter.put('/block',authMiddleware, blockUsers)
usersRouter.put('/unlock',authMiddleware, unlockUsers)
usersRouter.put('/changeRole',authMiddleware, changeRole)
