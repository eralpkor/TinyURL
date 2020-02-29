const router = require('express').Router();
const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost/url-shortner';
const connectOptions = {
  keepAlive: true,
  // reconnectTries: Number.MAX_VALUE,
  useUnifiedTopology: true,
  useNewUrlParser: true
};


mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, connectOptions, (err, db) => {
  if (err) console.log('Error: ', err);
  console.log('Connected to mongodb... yay...')
});

// router.get('/', (req, res) => {
//   res.sendFile('../../public/', {
//     root: __dirname,
//   });
// });

module.exports = router;