import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import {authRouter} from "./routes/authRouter";
import {usersRouter} from "./routes/usersRouter";

dotenv.config()


const PORT=process.env.PORT
const DB_URI=process.env.DB_URL
const CLIENT_URL=process.env.CLIENT_URL || "http://localhost:3000" || "https://course-project-front-rouge.vercel.app"

const app= express()
app.use(express.json())
app.use(cors({
    credentials:true,
    origin: "http://localhost:3000",
}))
app.use(cookieParser())
app.use("/auth", authRouter)
app.use("/users", usersRouter)


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
