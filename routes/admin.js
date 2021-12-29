const express = require('express');
const router = express.Router();
const admin = require('../controllers/adminController');

// admin route
router.get('/login', admin.login);
router.post('/login', admin.authLoginAdmin);
// router.get('/registerAdmin', admin.register);
router.post('/registerAdmin', admin.authRegister);
router.get('/adminpage', admin.authCookies);
//CRUD 
router.get('/adminpage/addtour', admin.tourManager);
router.get('/adminpage/cus', admin.getTour);
router.get('/adminpage/cus/ls/:tour_id', admin.getListUserBookingTour);

module.exports = router;