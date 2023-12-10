import bcrypt from "bcrypt";
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

import User from "../models/User.js";

async function signup(req, res) {
  console.log("Request hit hoe");
  try {
    const filterUser = await User.findOne({ email: req.body.email });

    if (filterUser) {
      // If the email already exists, send a response here and return from the function
      return res.status(401).send(`Ye Email pehle se hi le li gai hai ${filterUser}`);
    }

    // Generate a new password hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user object
    const newUser = {
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    }

    // Generate a JWT token
    const token = jwt.sign(newUser, process.env.secret_Key, { expiresIn: '1h' });

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.myEmail,
        pass: process.env.myEmailPass
      }
    });

    // this is Comment
    // Email options
    const mailOptions = {
      from: process.env.myEmail,
      to: req.body.email,
      subject: 'Sign Up Successfully',
      text: `
        Hey ${req.body.username}, apka account successfully bungya hai dentist app me.
        Ye rha apka token:

        http://localhost:3000/verifytoken?token=${token}
      `
    };

    // Send the email
    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error('Error:', error);
        res.status(500).send(error.message); // Handle email sending error
      } else {
        console.log('Email sent:', info.response);
        res.status(200).send(`${token} ye token hai`);
      }
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send(error.message);
  }
}

export default signup;
