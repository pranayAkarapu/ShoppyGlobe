import mongoose from "mongoose";

const connectDB = async()=>{

    mongoose.connection.on("connected",()=>{
        console.log("connected to database")
    });

    mongoose.connection.on("error",()=>{
        console.log("error connecting to database")
    })

    await mongoose.connect(`${process.env.MONGODB_URI}`)
}

export default connectDB;