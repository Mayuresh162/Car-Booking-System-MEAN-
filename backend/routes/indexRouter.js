const express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');
const bookingController = require('../controllers/bookingController');
const driverController = require('../controllers/driverController');
const paymentController = require('../controllers/paymentController');
const ticketController = require('../controllers/ticketController');
const jwtHelper = require('../config/jwtHelper');

//user
router.post('/register', userController.register);

router.post('/authenticate', userController.authenticate);

router.get('/userprofile', jwtHelper.verifyJwtToken, userController.userprofile);

//booking
router.post('/bookride', bookingController.bookride);

router.get('/getBooking', bookingController.getBooking);

//driver
router.get('/drivers', driverController.getDrivers);

// router.post('/selectedDriver', driverController.addDriver);

router.get('/driver', driverController.getDriverByLang);

//payment
router.post('/checkout', paymentController.checkout);

router.get('/payment', paymentController.setPayment);

router.get('/getPayment', paymentController.getPayment);

//ticket
router.post('/ticket', ticketController.storeTicket)

module.exports = router;