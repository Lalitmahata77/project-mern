import cookieParser from "cookie-parser"
import express from "express"
import dotenv from "dotenv"
const app = express()
import {connectDatabase} from "./config/dbConnect.js"
import errorMiddleware from "./middleware/error.js"

//handle uncaught exception
process.on("uncaughtException", (err)=>{
    console.log(`Error : ${err}`);
    console.log("shuting down due to uncaught expection");
    process.exit(1)
})
dotenv.config({path : "backend/config/config.env"})
const PORT = process.env.PORT || 3000
app.use(cookieParser())
app.use(express.json({limit : "10mb"}))
//import routes
import productRoute from "./route/productRoute.js"
import authRoute from "./route/authRoute.js"
import orderRoute from "./route/orderRoute.js"
app.use("/api/v1/", productRoute)
app.use("/api/v1",authRoute)
app.use("/api/v1/",orderRoute)
app.use(errorMiddleware)
const server = app.listen(PORT, ()=>{
   connectDatabase()
    console.log(`server is listening on port ${PORT}`);
})

//Handle unhandled promise rejection
process.on("unhandledRejection", (err)=>{
    console.log(`Error : ${err}`);
    console.log("shutting down server due to unhandled promise Rejection");
    server.close(()=>{
        process.exit(1);
    })
})


//mongodb+srv://lm3654725:987@cluster0.sijc1gf.mongodb.net/ECOMERCEproject?retryWrites=true&w=majority&appName=Cluster0