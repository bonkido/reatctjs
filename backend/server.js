import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRouter.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//app config
const app = express();
const port = 4000

//middleware
app.use(cors());
app.use(express.json());

// kết nối database
connectDB();

//api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order", orderRouter)


//routing
app.get("/",(req, res)=>{
    res.send("Hello World from Node.js and Express.js");
})
app.listen(port,()=>{
    console.log(`Server running on port http://localhost:${port}`);  // log the server running message on the console
});