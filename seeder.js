const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Destination = require('./models/Destination');
const Spot = require('./models/Spot');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
const destinations = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/destinations.json`, 'utf-8')
);
const spots = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/spots.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Destination.create(destinations);
    await Spot.create(spots);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Spot.deleteMany();
    await Destination.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
