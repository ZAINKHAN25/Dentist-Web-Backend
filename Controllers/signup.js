import User from "../models/User.js";

import bcrypt from "bcrypt";
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken'

async function signup(req, res) {
    try {
        // genereate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        // const newUser = new User({
        //     username: req.body.username,
        //     password: hashedPassword,
        //     email: req.body.email,
        //     desc: req.body.desc,
        //     age: req.body.age,
        //     profession: req.body.profession
        // });
        
        const newUser = {
                username: req.body.username,
                password: hashedPassword,
                email: req.body.email,
                desc: req.body.desc,
                age: req.body.age,
                profession: req.body.profession
        }

        const token = jwt.sign(newUser, process.env.secret_Key , { expiresIn: '1h' });


        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: 'zainarfeen87@gmail.com',
              pass: 'koxs uhlr iche nlsj'
            }
          });
    
        // Email options
        const mailOptions = {
            from: 'zainarfeen87@gmail.com',
            to: req.body.email,
            subject: 'Sign Up Succesfully',
            text: `
                Hey ${req.body.username} apka account succesfully ban gya hai in denstist app ${token}
            `
        };
    
        // Send email
        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.error('Error:', error);
            } else {
                console.log('Email sent:', info.response);
                // const user = await newUser.save()
                res.status(200).send(`${token} ye token hai`)
                // res.send('Kam hogya')
            }
        });


        // save user and respond
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
}

export default signup;


// 'mongodb+srv://Zainkhan25:BIhNRLM415DeVQX4@dentist-web-cluster-1.q4ttgha.mongodb.net/'