const mongoose = require('mongoose');

var ticketSchema = new mongoose.Schema({
    source: {
        type: String,
    },
    destination: {
        type: String,
    },
    pickupAddress: { 
        type: String,
    },
    pickupTime: { 
        type: String,
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    tripType: { 
        type: String,
    },
    driverName: { 
        type: String,
    },
    fare: { 
        type: String,
    },
    userId: {
        type: String,
        required: true,
    }
});

mongoose.model('Ticket', ticketSchema);