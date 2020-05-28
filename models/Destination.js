const mongoose = require('mongoose');
const slugify = require('slugify');

const DestinationSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Please add a destination country'],
      maxlength: [40, 'Country can not be more than 40 characters'],
      unique: false
    },
    region: {
      type: String,
      required: [true, 'Please add a destination region'],
      maxlength: [40, 'Region can not be more than 40 characters'],
      unique: false
    },
    area: {
      type: String,
      required: [true, 'Please add a destination area'],
      maxlength: [40, 'Area can not be more than 40 characters'],
      unique: false
    },
    slug: String
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Create destination slug from the name
DestinationSchema.pre('save', function(next) {
  this.slug = slugify(`${this.area}`, { lower: true });
  next();
});

// Cascade delete spots when destination is deleted
DestinationSchema.pre('remove', async function(next) {
  console.log(`Spots being removed from destination ${this._id}`);
  await this.model('Spot').deleteMany({ destination: this._id });
  next();
});

// Reverse populate with virtuals
DestinationSchema.virtual('spots', {
  ref: 'Spot',
  localField: '_id',
  foreignField: 'destination',
  justOne: false
});

module.exports = mongoose.model('Destination', DestinationSchema);
