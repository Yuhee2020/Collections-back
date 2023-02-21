import {Router} from "express";
import {authMiddleware} from "../middleware/authMiddleware";
import {
    createCollection,
    deleteCollection, editCollection,
    getCollection, getCollections,
} from "../controllers/collectionsController";



export const collectionsRouter=Router();

collectionsRouter.post('/createCollection',authMiddleware, createCollection)
collectionsRouter.get('/getCollections', getCollections)
collectionsRouter.get('/getCollection/:collectionId', getCollection)
collectionsRouter.delete('/deleteCollection/:collectionId',authMiddleware, deleteCollection)
collectionsRouter.put('/editCollection/',authMiddleware, editCollection)
