import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

async function login(req, res){
        try {
            const user = await User.findOne({email: req.body.email})
            if(!user){
                res.status(404).json("User not found")
            }
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if(!validPassword){
                res.status(400).json("Wrong Password")
            }
            const token = jwt.sign({user}, process.env.secret_LoginKey , { expiresIn: '10d' });
            res.status(200).json({user, logintoken: token})
        } catch (error) {
            res.status(500).json(error)
            console.log(error, "Error");
        }
}

export default login;