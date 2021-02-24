const mongoose = require('mongoose');

const Ticket = mongoose.model('Ticket');

module.exports.storeTicket = (req, res, next) => {
    var ticketData = new Ticket();
    ticketData.source = req.body.source;
    ticketData.destination = req.body.destination;
    ticketData.pickupAddress = req.body.pickupAddress;
    ticketData.pickupTime = req.body.pickupTime;
    ticketData.startDate = req.body.departDate;
    ticketData.endDate = req.body.returnDate;
    ticketData.tripType = req.body.tripType;
    ticketData.driverName = req.body.driverName;
    ticketData.fare = req.body.fare;
    ticketData.userId = req.body.userId;
    ticketData.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { return next(err); } 
    });
}