const jwt = require("jsonwebtoken");

const auth = (req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1];
    try {
       var decoded= jwt.verify(token,"notes");
       if(decoded){
        req.payload = decoded;
            next();
       }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};


module.exports = {auth};