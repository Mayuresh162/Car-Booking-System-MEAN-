const mongoose = require('mongoose');

const Payment = mongoose.model('Payment');
const stripe = require('stripe')('sk_test_51ILnrTCNLQqgYfC01qpM1GokStxUq0pvyZZoXZdmQ4IC3F3eJGKBvlhNTtRXbEBRczGisFVFyjeFHQf0BfOL1Fkk00S7Vf6a40')

module.exports.checkout = (req, res, next) => {
  console.log(req.body);
   stripe.charges.create({
     amount: req.body.amount,
     currency: 'INR',
     description: 'One-time fee',
     source: req.body.token.id
    }, (err, charge) => {
      if (err) {
        console.log(err);
        next(err);
      } else {
        res.json({success: true, status: "Payment Succesful", data: charge});
      }
  });
};

module.exports.setPayment = (req, res, next) => {
  var payData = new Payment();
  payData.pickupAddress = req.body.pickupAddress;
  payData.pickupTime = req.body.pickupTime;
  payData.fare = req.body.fare;
  payData.driverName = req.body.driverName;
  payData.driverLanguage = req.body.driverLanguage;
  payData.userId = req.body.userId;
  payData.save((err, doc) => {
      if (!err) { res.send(doc); }
      else { 
        console.log(err);
        return next(err); } 
  });
}

module.exports.getPayment = (req, res, next) => {
  Payment.findOne({userId: req.query.id }, (err, pay) => {
    if (!err) { res.send(pay); }
    else {
        console.log('Error in Retrieving Payment : ' + JSON.stringify(err, undefined, 2));
    }
});
}

