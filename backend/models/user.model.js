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
        trainingPricePerHour: {
            type: Number
        },
        notes: {
            type: [String],
        },
        physicalDetails: {
            gender: {
                type: String,
                enum: ['MALE', 'FEMALE'],
                required: true
            },
            height:{
                type: Number,
                required: true
            },
            weight:{
                type: Number,
                required: true
            }
        }
    },{
        timestamps: true,
    });

    module.exports = mongoose.model('User', userSchema);