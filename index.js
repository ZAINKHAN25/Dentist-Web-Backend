import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';

import signup from './Controllers/signup.js'
import login from './Controllers/login.js'


const app = express();
const port = 8000;

app.use(express.json());
dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Sucesfully connected to db');
    app.post('/sign-up', signup);
    app.post('/login', login);
}).catch(error => {
    console.error("Error connecting to DB:", error);
});


app.listen(port, () => {
    console.log(`App is running on port number http:localhost:${port}`);
})