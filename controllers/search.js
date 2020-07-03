const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Destination = require('../models/Destination');
const Spot = require('../models/Spot');

// @desc    Search database
// @route   GET /api/v1/search
// @access  Public
exports.search = asyncHandler(async (req, res, next) => {
    console.log(req.query);
    let { term } = req.query;
    console.log('hello')
    let spotResults = await Spot.find({ $text: { $search: term } });
    let destinationResults = await Destination.find({ $text: { $search: term } });
    console.log(spotResults)
    if (spotResults || destinationResults) {
        res.status(200).json({
            success: true,
            data: [...spotResults, ...destinationResults]
        })
    } else {
        console.log('didnt work')
    }
})