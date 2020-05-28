const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Destination = require('../models/Destination');

// @desc    Get all destinations
// @route   GET /api/v1/destinations
// @access  Public
exports.getDestinations = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single destination
// @route   GET /api/v1/destinations/:id
// @access  Public
exports.getDestination = asyncHandler(async (req, res, next) => {
  const destination = await Destination.findById(req.params.id);

  if (!destination) {
    return next(
      new ErrorResponse(
        `Destination not found with id of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: destination
  });
});

// @desc    Create new destination
// @route   POST /api/v1/destinations
// @access  Private/Admin
exports.createDestination = asyncHandler(async (req, res, next) => {
  const destination = await Destination.create(req.body);

  res.status(201).json({
    success: true,
    data: destination
  });
});

// @desc    Update destination
// @route   PUT /api/v1/destinations/:id
// @access  Private/Admin
exports.updateDestination = asyncHandler(async (req, res, next) => {
  let destination = await Destination.findById(req.params.id);

  if (!destination) {
    return next(
      new ErrorResponse(
        `Destination not found with id of ${req.params.id}`,
        404
      )
    );
  }

  // Make sure user is admin
  if (req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this bootcamp`,
        401
      )
    );
  }

  destination = await Destination.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: destination });
});

// @desc    Delete destination
// @route   DELETE /api/v1/destinations/:id
// @access  Private/Admin
exports.deleteDestination = asyncHandler(async (req, res, next) => {
  let destination = await Destination.findById(req.params.id);

  if (!destination) {
    return next(
      new ErrorResponse(
        `Destination not found with id of ${req.params.id}`,
        404
      )
    );
  }

  // Make sure user is admin
  if (req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this bootcamp`,
        401
      )
    );
  }

  destination.remove();

  res.status(200).json({ success: true, data: {} });
});
