import {Router} from "express";
import {authMiddleware} from "../middleware/authMiddleware";
import {getUsers} from "../controllers/usersController";

export const usersRouter=Router();

usersRouter.get('/getUsers',authMiddleware, getUsers)
