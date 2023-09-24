const mongoose = require('mongoose');

module.exports = mongoose.model('Asteroid', new mongoose.Schema({
    name: String,
    position: mongoose.Schema.Types.Mixed,
    mineralsNum: Number,
    status: Number,
}));