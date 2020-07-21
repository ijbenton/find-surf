const express = require('express');
const {
  getDestinations,
  getDestination,
  updateDestination,
  deleteDestination,
  createDestination
} = require('../controllers/destinations');

const Destination = require('../models/Destination');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(advancedResults(Destination, 'spots'), getDestinations)
  .post(protect, authorize('admin'), createDestination);

router
  .route('/:slug')
  .get(advancedResults(Destination, 'spots'), getDestination)
  .put(protect, authorize('admin'), updateDestination)
  .delete(protect, authorize('admin'), deleteDestination);

module.exports = router;
