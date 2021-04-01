    const mongoose = require('mongoose');

    const userSchema = new mongoose.Schema({
        email: {
            type: String,
            required: true,
            min: 6,
            max: 255,
        },
        firstName: {
            type: String,
            required: true,
            min: 1,
            max: 255
        },
        lastName: {
            type: String,
            required: true,
            min: 1,
            max: 255
        },
        phoneNumber:{
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 1024,
        },
        dateOfBirth: {
            type: Date,
            required: true
        },
        registrationDate: {
            type: Date,
            default: Date.now
        },
        role: {
            type: String,
            enum: ['COACH', 'TRAINEE'],
            default: 'TRAINEE',
            required: true
        },
        trainingPricesPerHour: {
            type: Number
        },
        gender: {
            type: String,
            enum: ['MALE', 'FEMALE'],
            required: true
        },
        notes: {
            type: [String],
        }
    },{
        timestamps: true,
    });

    module.exports = mongoose.model('User', userSchema);