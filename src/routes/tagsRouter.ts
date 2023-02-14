import {Router} from "express";
import {createTags, getTags} from "../controllers/tagsController";
import {authMiddleware} from "../middleware/authMiddleware";

export const tagsRouter=Router();

tagsRouter.get('/getTags', getTags)
tagsRouter.post('/createTags',authMiddleware, createTags)
