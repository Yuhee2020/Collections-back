import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser";
import router from "./routes";


require('dotenv').config()


const PORT=process.env.PORT
const DB_URI=process.env.DB_URL
const app= express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(router)

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
