import {Router} from "express";
import {authMiddleware} from "../middleware/authMiddleware";
import {
    createItem,
    deleteItems,
    editItem, findItems,
    getCollectionItems,
    getItem, getItems,
} from "../controllers/itemsController";



export const itemsRouter=Router();

itemsRouter.post('/createItem',authMiddleware, createItem)
itemsRouter.get('/getCollectionItems/:collectionId',getCollectionItems)
itemsRouter.get('/getItem/:itemId',getItem)
itemsRouter.get('/getLastItems', getItems)
itemsRouter.get('/findItems', findItems)
itemsRouter.put('/deleteItems',authMiddleware, deleteItems)
itemsRouter.put('/editItem',authMiddleware, editItem)


