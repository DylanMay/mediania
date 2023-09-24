const mongoose = require('mongoose');
module.exports = mongoose.model('History', new mongoose.Schema({
    date: Date,
    planetId: Number,
    asteroidId: Number,
    costTime: Number,
    action: Number
}));