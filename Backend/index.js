import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from 'express';
import cors from "cors";

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import chatbotRoutes from './routes/chatbot.route.js';
const app = express()
dotenv.config()
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//Middleware
app.use(express.json());


const port = process.env.PORT || 4002

//--------x---------DATABASE CONNECTION --------x---------
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
 console.log("CONNECTED TO MongoDB");
}).catch((error)=>{
    console.log("Error Connecting to MongoDB",error);
})



//Defining Routes

app.use("/bot/v1/",chatbotRoutes);

app.listen(port, () => {
  console.log(`Server Running On port ${port}`)
})