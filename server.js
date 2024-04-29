import express from "express"
import dotenv from "dotenv"
import db from "./config/db.js"
import cors from 'cors';
import bodyParser from 'body-parser'; 
import userRoutes from "./routes/userRoutes.js"

dotenv.config();

const app = express();

// Allow all origins
app.use(cors());
app.use(bodyParser.json());

app.use("/user/data", userRoutes)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
