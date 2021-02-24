const mongoose = require('mongoose');

var bookingSchema = new mongoose.Schema({
    source: { 
        type: String,
        required: 'Please enter pickup point.'
    },
    destination: { 
        type: String,
        required: 'Please enter destination.',
    },
    departDate: { 
        type: String,
        required: 'Please enter departure date.',
    },
    returnDate: { 
        type: String,
    },
    tripType: { 
        type: String,
        required: 'Please enter trip type.',
    },
    distance: { 
        type: Number,
    },
    userId: {
        type: String,
        required: true,
    }
});

mongoose.model('BookingDetail', bookingSchema);
