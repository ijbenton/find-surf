const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Destination = require('../models/Destination');
const Spot = require('../models/Spot');

// @desc    Search database
// @route   GET /api/v1/search
// @access  Public
exports.search = (req, res, next) => {
  const { term, type } = req.query;
  // const destinationRegionResults = await Destination.find({
  //   region: { $regex: new RegExp(term, 'i') }
  // });
  // const destinationCountryResults = await Destination.find({
  //   country: { $regex: new RegExp(term, 'i') }
  // });
  if (type === 'spots') {
    Spot.find(
      {
        $or: [
          {
            spotName: { $regex: new RegExp(term, 'i') }
          },
          {
            area1: { $regex: new RegExp(term, 'i') }
          },
          {
            area2: { $regex: new RegExp(term, 'i') }
          },
          {
            region: { $regex: new RegExp(term, 'i') }
          }
        ]
      },
      function(err, result) {
        if (err) {
          console.log('error');
        } else {
          res.status(200).json({
            success: true,
            data: result
          });
        }
      }
    );
  } else if (type === 'destinations') {
    Destination.find(
      {
        $or: [
          {
            area: { $regex: new RegExp(term, 'i') }
          },
          {
            country: { $regex: new RegExp(term, 'i') }
          },
          {
            region: { $regex: new RegExp(term, 'i') }
          }
        ]
      },
      function(err, result) {
        if (err) {
          console.log('error');
        } else {
          res.status(200).json({
            success: true,
            data: result
          });
        }
      }
    );
  }
};
