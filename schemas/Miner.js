const mongoose = require('mongoose');

module.exports = mongoose.model('Miner', new mongoose.Schema({
    name: String,
    planetId: String,
    carryCapacity: Number,
    travelSpeed: Number,
    miningSpeed: Number,
    position: mongoose.Schema.Types.Mixed,
    status: Number,
}));