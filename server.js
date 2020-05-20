const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route files
const spots = require('./routes/spots');
const auth = require('./routes/auth');
const users = require('./routes/users');

const app = express();

// Body Parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// File uploading
app.use(fileUpload());

// Mount routers
app.use('/api/v1/spots', spots);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server is running in ${process.env.NODE_ENV} mode on ${PORT}`)
);
