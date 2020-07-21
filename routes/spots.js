const express = require('express');
const {
  getSpots,
  getSpot,
  updateSpot,
  deleteSpot,
  createSpot,
  spotPhotoUpload
} = require('../controllers/spots');

const Spot = require('../models/Spot');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router.route('/:slug/photos').put(protect, spotPhotoUpload);

router
  .route('/')
  .get(advancedResults(Spot), getSpots)
  .post(protect, authorize('admin'), createSpot);

router
  .route('/:slug')
  .get(getSpot)
  .put(protect, authorize('admin'), updateSpot)
  .delete(protect, authorize('admin'), deleteSpot);

module.exports = router;
