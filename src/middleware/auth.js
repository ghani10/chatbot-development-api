const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {

    //validasi token
    const header = req.headers['authorization']?.split(" ")[1];
    if(!header) {
        return res.status(401).json({
            massage: "Invalid token"
        })
    };

    const token = header.replace("Bearer ", "");
    
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    }catch (err) {
        res.status(401).json({
            massage: "Invalid token"
        });
    }

};