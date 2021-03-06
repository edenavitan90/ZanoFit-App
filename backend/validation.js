const Joi = require('@hapi/joi');

// Register validation
const registerValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        firstName: Joi.string().min(1).required(),
        lastName: Joi.string().min(1).required(),
        phoneNumber: Joi.string().required().length(10).pattern(/^[0-9]+$/),
        password: Joi.string().min(6).max(10).required(), // Needs improvement   
        dateOfBirth: Joi.date().required(),
        registrationDate: Joi.date().required(),
        role: Joi.string().required(),
        trainingPricePerHour: Joi.number().min(0),
        notes: Joi.array().items(Joi.string()),
        physicalDetails: Joi.object().keys({
            gender: Joi.string().required(),
            height: Joi.number().min(0).max(2.5).required(), 
            weight: Joi.number().min(0).max(300).required(),
        }).required()
    }); 
    return schema.validate(data);
};

// Login validation
const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(), // Needs improvement
    }); 
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
