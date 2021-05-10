const router = require('express').Router();
const User = require('../../../models/user.model');
const verifyToken = require('../../verifyToken');
const verifyCoach = require('./verifyCoach');

// Gets all the users that NOT coaches.
router.get('/trainees', verifyToken, verifyCoach('COACH'),(req, res)=> {      
    User.find({role: 'TRAINEE'})
        .then(users => res.json(users))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

// Gets all the users that coaches.
router.get('/coaches', verifyToken, verifyCoach('COACH'),(req, res)=> {   
    User.find({role: 'COACH'})
        .then(users => res.json(users))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;