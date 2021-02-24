const mongoose = require('mongoose');

const BookingDetail = mongoose.model('BookingDetail');

module.exports.bookride = (req, res, next) => {
    var booking = new BookingDetail();
    booking.source = req.body.source;
    booking.destination = req.body.destination;
    booking.departDate = req.body.departDate;
    booking.returnDate = req.body.returnDate;
    booking.tripType = req.body.tripType;
    booking.distance = req.body.distance;
    booking.userId = req.body.userId;
    booking.save((err, doc) => {
        if (!err) { res.send(doc); }
        else {
            console.log(err);
            return next(err);
        } 
    });
}

module.exports.getBooking = (req, res, next) => {
    BookingDetail.findOne(({ userId: req.query.id }), (err, bookingDetail) => {
        if (!err) { res.send(bookingDetail); }
        else {
            console.log('Error in Retrieving Booking Details : ' + JSON.stringify(err, undefined, 2));
        }
    });
}
