const router = require('express').Router();
const verifyToken = require('./verifyToken');
const jwt = require('jsonwebtoken');

router.get('/', (req, res)=> {

    const token = req.header('auth-token'); // gets the user token 
    const decodedToken = jwt.decode(token);
    
    res.send({
        'auth-token': token,
        user: {
            "email": "amitzano@gmail.com",
            "password": "amitzano"
        }
    });
});

module.exports = router;