
const router = require('express').Router();
const mongoose = require('mongoose');
// const mongoURI = 'mongodb://localhost/url-shortner';
const mongoURI = 'mongodb+srv://admin:' + process.env.PASSWORD + '@cluster0.m2oo8.mongodb.net/tinyurl?retryWrites=true&w=majority';

const connectOptions = {
  keepAlive: true,
  // reconnectTries: Number.MAX_VALUE,
  useUnifiedTopology: true,
  useNewUrlParser: true
};


mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, connectOptions, (err, db) => {
  if (err) {
    console.log('Error: ', err);
  } else {
  console.log('Connected to mongodb...');
  }
});

module.exports = router;
