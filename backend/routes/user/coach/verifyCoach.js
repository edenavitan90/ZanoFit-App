const User = require('../../../models/user.model');

// Middleware function to check if the user is also a coach.
module.exports = function(role) {
    return async (req, res, next) => {
        const user = await User.findOne({_id: req.user._id});
        if(user.role != role) return res.status(401).send('Not Authorized');
        next();
    }
}