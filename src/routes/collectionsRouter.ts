import {Router} from "express";
import {authMiddleware} from "../middleware/authMiddleware";
import {
    createCollection,
    deleteCollection, editCollection,
    getCollection,
    getUserCollections
} from "../controllers/collectionsController";



export const collectionsRouter=Router();

collectionsRouter.post('/createCollection',authMiddleware, createCollection)
collectionsRouter.get('/getUserCollections/:userId',authMiddleware, getUserCollections)
collectionsRouter.get('/getCollection/:collectionId',authMiddleware, getCollection)
collectionsRouter.delete('/deleteCollection/:collectionId',authMiddleware, deleteCollection)
collectionsRouter.put('/editCollection/',authMiddleware, editCollection)
