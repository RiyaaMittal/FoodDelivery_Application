import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRoute from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//app config
const app=express(); // a basic express server is created
const port=4000;
//thunderclient to test our api/backend

//middleware
app.use(express.json()); //using this whenever a request is made from frontend to backend that will be parsed through this json
app.use(cors());
//can access backend through/from any frontend thruogh thid middleware

//db connection
connectDB();

//api endpoints
app.use("/api/food",foodRouter); //route for foods
app.use("/images",express.static('uploads'));//we have mount this folder at this endpoint now if we 
//typ like http://localhost:4000/images/..filename...-> it will give us that image
//if we upload any file in this folder we can use that /acces that using this /image/filename
app.use("/api/user",userRoute);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);

app.get("/",(req,res)=>{ // a slash endpoint 
    res.send("api working");
})

app.listen(port,()=>{
    console.log(`server started on port ${port}`);
})

