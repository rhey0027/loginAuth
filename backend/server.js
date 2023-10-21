import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import { requestNotFound, errorHandler } from "./middleware/customError.js";
import cookieParser from "cookie-parser";

const port = process.env.PORT || 5000;
const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRoutes);
app.get('/', (req, res) => console.log('Server is ready'));

//custom error handler
app.use(requestNotFound);
app.use(errorHandler);

//database
const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('connected to database')
    }
    catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

app.listen(port, () => {
    connect()
    console.log(`Server is active on port=> ${port}`)
});

