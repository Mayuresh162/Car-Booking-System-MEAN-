const mongoose = require('mongoose');

var paymentSchema = new mongoose.Schema({
    pickupAddress: { 
        type: String,
    },
    pickupTime: { 
        type: String,
    },
    fare: { 
        type: String,
    },
    driverName: { 
        type: String,
    },
    driverLanguage: { 
        type: String,
    },
    userId: {
        type: String,
        required: true,
    }
});

mongoose.model('Payment', paymentSchema);