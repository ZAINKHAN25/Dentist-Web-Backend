import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';

import signup from './Controllers/signup.js';
import login from './Controllers/login.js';
import verfiyToken from './Controllers/verfiyToken.js';
import addPatientData from './Controllers/addPatientData.js';
import verifyLogin from './Controllers/verifyLogin.js';
import getAllPatientData from './Controllers/getAllPatientData.js';
import searchPatient from './Controllers/searchPatient.js';


const app = express();
const port = 8000;

app.use(express.json());
dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Sucesfully connected to db');
    app.post('/sign-up', signup);
    app.post('/login', login);
    app.post('/verfiy-token', verfiyToken);
    app.post('/add-ptnt-data', verifyLogin, addPatientData);
    app.post('/ptnt-data', verifyLogin, getAllPatientData);
    app.post('/search-patient', verifyLogin, searchPatient)
}).catch(error => {
    console.error("Error connecting to DB:", error);
});


app.listen(port, () => {
    console.log(`App is running on port number http:localhost:${port}`);
})