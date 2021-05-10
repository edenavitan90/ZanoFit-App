const jwt = require('jsonwebtoken');

// Middleware function to check if the user have the correct token.
module.exports = function(req, res, next) {

    const token = req.header('auth-token'); // gets the user token 
    if(!token) return res.status(401).send('Access Denied'); // 401 - resource that we cannot access.

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }
    catch(err){
        res.status(400).send('Invalid Token');
    }
}
