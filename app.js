import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";
import bodyParser from "body-parser";
import User from "./models/user.js";
import cors from "cors";

dotenv.config({
    path: "./env"
});

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

connectDB();

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username: username });
        if (!existingUser) {
            return res.status(409).json({ error: "User is not Registered!" });
        }
        const isPasswordCorrect = await existingUser.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            return res.status(403).json({ error: "Incorrect Password" });
        }
        const token = existingUser.generateAccessToken();
        return res.json({ token });
    }
    catch (err) {
        console.log("Error:", err);
    }
});

app.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.status(409).json({ error: "User Already Exists" });
        }
        const newUser = new User({ username, password });
        await newUser.save();
        const token = newUser.generateAccessToken();
        return res.json({ token });
    }
    catch (err) {
        console.log("Error:", err);
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});