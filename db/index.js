import { MongoClient } from "mongodb";
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connection = await MongoClient.connect(process.env.uri);
        console.log("MongoDB connected");
    }
    catch (error) {
        console.log("Error:", error);
    }
}

export default connectDB;