import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import {authRouter} from "./routes/authRouter";
import {usersRouter} from "./routes/usersRouter";
import {collectionsRouter} from "./routes/collectionsRouter";
import {authMiddleware} from "./middleware/authMiddleware";
import {itemsRouter} from "./routes/itemsRouter";
import {tagsRouter} from "./routes/tagsRouter";
import {commentsRouter} from "./routes/commentsRouter";

dotenv.config()

const PORT=process.env.PORT
const DB_URI=process.env.DB_URL

const app= express()
app.use(express.json())
app.use(cors({
    credentials:true,
    origin: true,
}))

app.use(cookieParser())

app.use("/auth", authRouter)
app.use("/users", authMiddleware, usersRouter)
app.use("/collections", collectionsRouter)
app.use("/items", itemsRouter)
app.use("/tags", tagsRouter)
app.use("/comments", commentsRouter)

mongoose.set('strictQuery', false)

const start=async ()=>{
    try {
        await mongoose.connect(`${DB_URI}`)
        app.listen(PORT,()=>console.log(`Server started on PORT = ${PORT}`))
    }catch (e){
        console.log(e)
    }
}
start()
