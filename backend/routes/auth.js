const router = require('express').Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Imports Routes:
const verifyToken = require('./verifyToken');
const {registerValidation, loginValidation} = require('../validation');
const User = require('../models/user.model');
const verifyCoach = require('./user/coach/verifyCoach');


// Register - Only a 'COACH' can can register a new 'USER'/new 'COACH' to the system.
router.post('/register', verifyToken, verifyCoach('COACH'), async (req, res) => {
//router.post('/register', async (req, res) => {
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
        phoneNumber: req.body.phoneNumber,
        password: hashedPassword,
        dateOfBirth: req.body.dateOfBirth,
        registrationDate: req.body.registrationDate,
        role: req.body.role,
        gender: req.body.gender,
        trainingPricePerHour: req.body.trainingPricePerHour,
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
    try{
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
        //res.header('auth-token').send(token);
        res.status(201).header('auth-token', token).send({token: token});

    } catch (err){
        res.status(400).send(err);
    }
});

// Check if the (which) user isLoggedIn (the token has already been authenticated, but now we will find the user)
router.get('/isLoggedIn', verifyToken, async (req, res) => {
//router.get('/isLoggedIn', async (req, res) => {

    const token = req.header('auth-token');
    const decodedToken = jwt.decode(token);
    
    try{
        // Searching the user with the same token.
        const user = await User.findOne(
            { _id: decodedToken._id }, // Find by _id
            { password:0 }); // The field "password" will not be returned.
        if(!user) return res.status(400).send('User not found');

        res.send({
            'auth-token': token,
            'isLoggedIn': true,
            user: user
        });
    } catch (err){
        res.status(400).send(err);
    }
});

module.exports = router;