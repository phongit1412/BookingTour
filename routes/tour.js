const express = require('express');
const router = express.Router();
const tourCtrl = require('../controllers/tourController');

router.get('/booking', tourCtrl.getTour);
router.get('/booking/:page', tourCtrl.getTour);
router.get('/add', tourCtrl.themTour);
router.post('/add', tourCtrl.addTour);
router.delete('/delete', tourCtrl.removeTour);
router.put('/update', tourCtrl.updateTour);
router.get('/find/:id', tourCtrl.findTour);

module.exports = router;