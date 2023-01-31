import {Router} from "express";
import {authMiddleware} from "../middleware/authMiddleware";
import {authMe, login, registration} from "../controllers/authController";
import {blockUser, deleteUser, getUsers, unlockUser} from "../controllers/usersController";
import {check} from "express-validator";

const router=Router();

router.post('/registration',[
    check('email', "Email is required").notEmpty(),
    check('password', "Password is required").isLength({min:1})
], registration)
router.post('/login',login)
router.get('/auth',authMiddleware, authMe)
router.get('/users',authMiddleware, getUsers)
router.put('/delete', deleteUser)
router.put('/block', blockUser)
router.put('/unlock', unlockUser)

export default router