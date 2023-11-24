import jwt  from "jsonwebtoken";

async function verifyLogin(req, res, next){
    try {    
        const decoded = await jwt.verify(req.body.token, process.env.secret_LoginKey);
        if(decoded){
            console.log(decoded);
            next()
        } else{
            console.log("Masla arha hai in decoded", decoded);
            res.status(500).send("Banda login nahi hai")
        }


    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
} 
export default verifyLogin;