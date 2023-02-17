import {Router} from "express";
import {authMiddleware} from "../middleware/authMiddleware";
import {createComment, getComments} from "../controllers/commentController";


export const commentsRouter=Router();

commentsRouter.post('/createComment',authMiddleware, createComment)
commentsRouter.get('/getComments/:itemId', getComments)
