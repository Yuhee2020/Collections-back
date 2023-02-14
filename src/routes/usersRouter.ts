import {Router} from "express";
import {blockUsers, changeRole, deleteUsers, getUsers, unlockUsers} from "../controllers/usersController";

export const usersRouter=Router();

usersRouter.get('/getUsers', getUsers)
usersRouter.put('/delete', deleteUsers)
usersRouter.put('/block',blockUsers)
usersRouter.put('/unlock', unlockUsers)
usersRouter.put('/changeRole', changeRole)
