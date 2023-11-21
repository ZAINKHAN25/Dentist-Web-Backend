import User from "../models/User.js";
import bcrypt from "bcrypt"

async function signup(req, res) {
    try {
        // genereate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            desc: req.body.desc,
            age: req.body.age,
            profession: req.body.profession
        });

        // save user and respond
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

export default signup;


// 'mongodb+srv://Zainkhan25:BIhNRLM415DeVQX4@dentist-web-cluster-1.q4ttgha.mongodb.net/'