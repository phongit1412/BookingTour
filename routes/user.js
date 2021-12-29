const controller = require('../controllers/controller');
const booking = require('../controllers/bookingController');
const express = require('express');
const router = express.Router();


// user route
router.get('/login', controller.login);
router.get('/register', controller.register);
router.post('/register', controller.authRegister);
router.post('/login', controller.authLogin);
router.get('/booking', controller.authCookies);
router.get('/profile', controller.authProfile);
router.get('/active/:token', controller.ActiProfile);
//booking route
//router.get('/weltobooking', booking.booking);
module.exports = router;