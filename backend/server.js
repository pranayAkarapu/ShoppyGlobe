import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import path from "path";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

dotenv.config();

//App config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

//Middlewares
app.use(express.json());
app.use(cors());

//API Endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use('/api/order', orderRouter)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res)=>{
    res.send("Welcome to ShoppyGlobe Backend Server");
})