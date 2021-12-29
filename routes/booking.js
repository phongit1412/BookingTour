const express = require('express');
const router = express.Router();
const bookingCtrl = require('../controllers/bookingController');

router.get('/home', bookingCtrl.getBooking);
router.post('/add', bookingCtrl.addBooking);
router.delete('/delete/:id', bookingCtrl.removeBooking);
router.put('/update/:id', bookingCtrl.updateBooking);
router.get('/find/:id', bookingCtrl.findBooking);

module.exports = router;