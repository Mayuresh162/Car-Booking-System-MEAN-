const mongoose = require('mongoose');

var driverSchema = new mongoose.Schema({
    name: { type: String },
    price: { type: Number },
    language: { type: String }
});

mongoose.model('Driver', driverSchema);
