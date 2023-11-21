import jwt from 'jsonwebtoken';
import User from "../models/User.js";


async function verfiyToken(req, res){
    try {
        const decoded = await jwt.verify(req.body.token, process.env.secret_Key);
        console.log(decoded);
        const newUser = new User(decoded)
        console.log('Decoded Token:', decoded);
        const user = await newUser.save()
        res.status(200).json(user);
    } catch (err) {
        console.error('Token verification failed:', err);
        res.status(404).send(err.message);
    }
}

export default verfiyToken;