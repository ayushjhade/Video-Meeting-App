import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser"
import { initDB } from "./config/db.js";

const app = express();

initDB() //connect to Neon & Initialize Tables

const allowedOrigins = process.env.ORIGINS.split(",")
app.use(cors({origin:allowedOrigins, credentials: true}))
app.use(cookieParser())

app.use(express.json())
app.get("/",(req,res)=>res.send("API is Live!"))

const port = process.env.PORT || 3000;

app.listen(port , () => {
    console.log(`server is running at http:localhost:${port}`);
})

