// verifyToken.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

async function verifyToken(req, res) {
    try {
        // Decode the token
        const decoded = await jwt.verify(req.body.logintoken, process.env.secret_Key);

        // Check if the email already exists
        const filterUser = await User.findOne({ email: decoded.email });

        if (filterUser) {
            // If the email already exists, send a response here
            return res.status(401).send(`Ye Email pehle se hi le li gai hai ${filterUser}`);
        }

        // If the email doesn't exist, add the user to the database
        const newUser = new User(decoded);
        const user = await newUser.save();

        res.status(200).json(user);
    } catch (err) {
        console.error('Token verification failed:', err);

        if (err.name === 'JsonWebTokenError') {
            res.status(401).send('Invalid token');
        } else {
            res.status(500).send('Internal server error');
        }
    }
}

export default verifyToken;
