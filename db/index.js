import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect("mongodb://127.0.0.1:27017/db");
        console.log("MongoDB connected");
    }
    catch (error) {
        console.log("Error:", error);
    }
}

export default connectDB;