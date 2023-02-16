import {Router} from "express";
import {authMiddleware} from "../middleware/authMiddleware";
import {
    createItem,
    deleteItems,
    editItem, findItems,
    getCollectionItems,
    getItem,
    getLastItems
} from "../controllers/itemsController";



export const itemsRouter=Router();

itemsRouter.post('/createItem',authMiddleware, createItem)
itemsRouter.get('/getCollectionItems/:collectionId',authMiddleware, getCollectionItems)
itemsRouter.get('/getItem/:itemId',authMiddleware, getItem)
itemsRouter.get('/getLastItems/', getLastItems)
itemsRouter.get('/findItems/', findItems)
itemsRouter.put('/deleteItems',authMiddleware, deleteItems)
itemsRouter.put('/editItem',authMiddleware, editItem)


