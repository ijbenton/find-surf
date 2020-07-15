const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Destination = require('../models/Destination');
const Spot = require('../models/Spot');

// @desc    Search database
// @route   GET /api/v1/search
// @access  Public
exports.search = asyncHandler(async (req, res, next) => {
  const { term } = req.query;
  // Specific search
  // const spotResults = await Spot.find({ $text: { $search: term } });
  // const destinationResults = await Destination.find({ $text: { $search: term } });
  // Partial Search
  const spotNameResults = await Spot.find({
    spotName: { $regex: new RegExp(term, 'i') }
  });
  const spotArea1Results = await Spot.find({
    area1: { $regex: new RegExp(term, 'i') }
  });
  const spotArea2Results = await Spot.find({
    area2: { $regex: new RegExp(term, 'i') }
  });
  const destinationRegionResults = await Destination.find({
    region: { $regex: new RegExp(term, 'i') }
  });
  const destinationCountryResults = await Destination.find({
    country: { $regex: new RegExp(term, 'i') }
  });

  const spotResults = [
    ...spotNameResults,
    ...spotArea1Results,
    ...spotArea2Results
  ];
  const destinationResults = [
    ...destinationRegionResults,
    ...destinationCountryResults
  ];

  const uniqueSpotResults = spotResults.filter(
    (item, index, self) =>
      self.findIndex(selfItem => selfItem.spotName === item.spotName) === index
  );
  const uniqueDestinationResults = destinationResults.filter(
    (item, index, self) =>
      self.findIndex(selfItem => selfItem.area === item.area) === index
  );
  res.status(200).json({
    success: true,
    data: [...uniqueSpotResults, ...uniqueDestinationResults]
  });
});
