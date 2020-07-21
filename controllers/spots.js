const path = require('path');
const sharp = require('sharp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Spot = require('../models/Spot');

// @desc    Get all spots
// @route   GET /api/v1/spots
// @access  Public
exports.getSpots = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single spot
// @route   GET /api/v1/spots/:slug
// @access  Public
exports.getSpot = asyncHandler(async (req, res, next) => {
  const spot = await Spot.findOne({slug: req.params.slug});

  if (!spot) {
    return next(
      new ErrorResponse(`Spot not found with slug of ${req.params.slug}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: spot
  });
});

// @desc    Create new spot
// @route   POST /api/v1/spots
// @access  Private/Admin
exports.createSpot = asyncHandler(async (req, res, next) => {
  const spot = await Spot.create(req.body);

  res.status(201).json({
    success: true,
    data: spot
  });
});

// @desc    Update spot
// @route   PUT /api/v1/spots/:slug
// @access  Private/Admin
exports.updateSpot = asyncHandler(async (req, res, next) => {
  //let spot = await Spot.findById(req.params.id);
  const spot = await Spot.findOne({slug: req.params.slug});
  if (!spot) {
    return next(
      new ErrorResponse(`Spot not found with slug of ${req.params.slug}`, 404)
    );
  }

  // Make sure user is admin
  if (req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this spot`,
        401
      )
    );
  }

  if (req.body.location) {
    spot.location.coordinates = req.body.location.coordinates;
    await spot.save();
  } else {
    await Spot.updateOne({ slug: req.params.slug }, req.body, {
      new: true,
      runValidators: true
    });
  }

  // spot = await Spot.updateOne({ _id: req.params.id }, req.body, {
  //   new: true,
  //   runValidators: true
  // });

  res.status(200).json({ success: true, data: spot });
});

// @desc    Delete spot
// @route   DELETE /api/v1/spots/:slug
// @access  Private/Admin
exports.deleteSpot = asyncHandler(async (req, res, next) => {
  // let spot = await Spot.findById(req.params.id);
  const spot = await Spot.findOne({slug: req.params.slug});

  if (!spot) {
    return next(
      new ErrorResponse(`Spot not found with slug of ${req.params.slug}`, 404)
    );
  }

  // Make sure user is admin
  if (req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this spot`,
        401
      )
    );
  }

  spot.remove();

  res.status(200).json({ success: true, data: {} });
});

// @desc    Upload photo to spot
// @route   PUT /api/v1/spots/:slug/photos
// @access  Private
exports.spotPhotoUpload = asyncHandler(async (req, res, next) => {
  // const spot = await Spot.findById(req.params.id);
  const spot = await Spot.findOne({slug: req.params.slug});

  if (!spot) {
    return next(
      new ErrorResponse(`Spot not found with slug of ${req.params.slug}`, 404)
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom file name
  file.name = `photo_${Math.floor(Math.random() * 10000) + 1}${
    path.parse(file.name).ext
  }`;

  file.mv(`${process.env.FILE_STORE_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    const isDefault = await Spot.findOne({
      slug: req.params.slug,
      spots: 'no-image.jpg'
    });

    if (isDefault) {
      await Spot.findOneAndUpdate({slug: req.params.slug}, {
        photos: [file.name]
      });
    } else {
      await Spot.findOneAndUpdate({slug: req.params.slug}, {
        $push: { photos: file.name }
      });
    }

    // await Spot.findByIdAndUpdate(req.params.id, {
    //   $push: { photos: file.name }
    // });

    sharp(`${process.env.FILE_STORE_PATH}/${file.name}`)
      .resize(640, 480)
      .toFile(`${process.env.FILE_UPLOAD_PATH}/${file.name}`);

    res.status(200).json({
      success: true,
      data: {
        fileName: file.name,
        filePath: `${process.env.FILE_UPLOAD_PATH}/${file.name}`
      }
    });
  });
});
