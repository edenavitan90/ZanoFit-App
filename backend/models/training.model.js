const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
    
},{
    timestamps: true,
});

module.exports = mongoose.model('Training', trainingSchema);