const mongoose = require('mongoose');

module.exports = mongoose.model('Planet', new mongoose.Schema({
    name: String,
    mineralNum: Number,
    position: mongoose.Schema.Types.Mixed
}));