import User from "../models/User.js";
import bcrypt from "bcrypt"

async function login(req, res){
        try {
            const user = await User.findOne({email: req.body.email})
            if(!user){
                res.status(404).json("User not found")
            }
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            console.log(validPassword);
            if(!validPassword){
                res.status(400).json("Wrong Password")
            }
    
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
}

export default login;