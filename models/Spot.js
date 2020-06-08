const mongoose = require('mongoose');
const slugify = require('slugify');
const Destination = require('../models/Destination');
const axios = require('axios');
const geocoder = require('../utils/geocoder');

const SpotSchema = new mongoose.Schema({
  spotName: {
    type: String,
    required: [true, 'Please add a spot name'],
    trim: true,
    maxlength: [40, 'Spot name can not be more than 40 characters'],
    unique: false
  },
  country: {
    type: String,
    required: [true, 'Please enter a country']
  },
  region: String,
  area1: String,
  area2: String,
  slug: String,
  description: {
    type: String,
    maxlength: [6000, 'Description can not be more than 6000 characters']
  },
  swellDirection: String,
  bestWind: String,
  bestSize: String,
  bestTide: String,
  photos: {
    type: [String],
    default: ['no-image.jpg']
  },
  destination: {
    type: mongoose.Schema.ObjectId,
    ref: 'Destination',
    required: true
  },
  location: {
    // GeoJSON Point
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String
  }
});

// Create bootcamp slug from the name
SpotSchema.pre('save', function(next) {
  this.slug = slugify(this.spotName, { lower: true });
  next();
});

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function sleep(param) {
  await timeout(10000 * Math.random() + 1);
  return geocoder.geocode(param);
}

// Geocode & create location field
SpotSchema.pre('save', async function(next) {
  // const loc = await geocoder.geocode(
  //   `${this.spotName}, ${this.area2}, ${this.area1}, ${this.region}, ${this.country}`
  // );
  let loc;
  if (this.location) {
    loc = await sleep(
      `${this.location.coordinates[1]}, ${this.location.coordinates[0]}`
    );
  } else {
    loc = await sleep(
      `${this.spotName}, ${this.area1}, ${this.region}, ${this.country}`
    );
  }

  //console.log(loc);
  if (loc[0]) {
    this.location = {
      type: 'Point',
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddress: loc[0].formattedAddress,
      street: loc[0].streetName,
      city: loc[0].city,
      state: loc[0].stateCode,
      zipcode: loc[0].zipcode,
      country: loc[0].countryCode
    };
  }

  // // Do not save address in DB
  // this.address = undefined;
  next();
});

SpotSchema.pre('updateOne', function(next) {
  let loc;
  if (this.location) {
    loc = await sleep(
      `${this.location.coordinates[1]}, ${this.location.coordinates[0]}`
    );
  } else {
    loc = await sleep(
      `${this.spotName}, ${this.area1}, ${this.region}, ${this.country}`
    );
  }

  //console.log(loc);
  if (loc[0]) {
    this.location = {
      type: 'Point',
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddress: loc[0].formattedAddress,
      street: loc[0].streetName,
      city: loc[0].city,
      state: loc[0].stateCode,
      zipcode: loc[0].zipcode,
      country: loc[0].countryCode
    };
  }

  // // Do not save address in DB
  // this.address = undefined;
  next();
});

module.exports = mongoose.model('Spot', SpotSchema);
