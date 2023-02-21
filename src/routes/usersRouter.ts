import {Router} from "express";
import {deleteUsers, getUsers, updateUsers} from "../controllers/usersController";

export const usersRouter=Router();

usersRouter.get('/getUsers', getUsers)
usersRouter.put('/delete', deleteUsers)
usersRouter.put('/update',updateUsers)

