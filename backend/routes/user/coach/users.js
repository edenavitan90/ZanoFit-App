const router = require('express').Router();
const { json } = require('express');
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


router.get('/users', verifyToken, verifyCoach('COACH'), async (req, res) => {
    try{
        const users = await User.find().sort({role: 1});
        res.status(200).send(users);
    } catch (err){
        res.status(400).send(err);
    }
});

router.delete('/delete-user', verifyToken, verifyCoach('COACH'), async (req, res) => {
    User.deleteOne({email: req.body.email})
        .then(thing => res.status(200).send({ message : 'O-K'}))
        .catch(err => res.status(400).send(err));
});// `The user: ${req.body.firstName} ${req.body.lastName} has been deleted.`

module.exports = router;