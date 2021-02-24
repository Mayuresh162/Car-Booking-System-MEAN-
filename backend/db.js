const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
    if(!err) {
        console.log('MongoDB connection succeeded');
    } else {
        console.log('Error in DB Connection : ' + JSON.stringify(err, undefined, 2));
    }
});

require('./models/user');
require('./models/booking');
require('./models/driver');
require('./models/payment');
require('./models/ticket');


module.exports = mongoose;