const mongoose = require('mongoose');
const slugify = require('slugify');

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
    default: []
  }
});

// Create bootcamp slug from the name
SpotSchema.pre('save', function(next) {
  this.slug = slugify(this.spotName, { lower: true });
  next();
});

module.exports = mongoose.model('Spot', SpotSchema);
