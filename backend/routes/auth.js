const router = require('express').Router();
const User = require('../models/user.model');
const {registerValidation, loginValidation} = require('../validation');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyToken');
const verifyCoach = require('./verifyCoach');

// Register - Only a 'COACH' can can register a new 'USER'/new 'COACH' to the system.
//router.post('/register', verifyToken, verifyCoach('COACH'), async (req, res) => {
router.post('/register', async (req, res) => {
    // User validation before create a user.
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    // Checking if the email already used before 
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('This "email" already exists.');

    // Checking if the name already used before: The combination of first name and last name together.
    const nameExist = await User.findOne({firstName: req.body.firstName, lastName: req.body.lastName});
    if(nameExist) return res.status(400).send('This "name" ("First Name" & "Last Name") already exists.');

    // Hash password 
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        password: hashedPassword,
        registrationDate: req.body.registrationDate,
        role: req.body.role,
        trainingPricesPerHour: req.body.trainingPricesPerHour,
        notes: req.body.notes,
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    } 
    catch(err){
        res.status(400).send(err);
    }
});

// Login
router.post('/login', async (req, res) => {
    // User validation before create a user.
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Checking if the email exists.
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('This "email" is not found.');

    // Checking if the password is correct.
    const validPassword = await bcryptjs.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid password');

    // Create and assign a token.
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token').send(token);
});

module.exports = router;