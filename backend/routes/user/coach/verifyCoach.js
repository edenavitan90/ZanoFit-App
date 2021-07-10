const User = require('../../../models/user.model');

// Middleware function to check if the user is also a coach.
module.exports = function(role) {
    console.log("verifyCoach");
    return async (req, res, next) => {
        const user = await User.findOne({_id: req.user._id});
        if(user === null) return res.status(400).send(`Bad Request - user not found - options:
                                                        1) Missing token.
                                                        2) The user does not exist in the DB.
                                                        3) etc'`);
        else if(user.role != role) return res.status(401).send('Not Authorized');
        next();
    }
}