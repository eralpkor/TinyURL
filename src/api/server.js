let express = require('express'),
  cors = require('cors'),
  helmet = require('helmet'),
  bodyParser = require('body-parser'),
  // mongoose = require('mongoose'),
  // btoa = require('btoa'),
  // atob = require('atob'),
  // promise,
  // connectionString = process.env.connectionString;
  corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

server = express();

const baseRouter = require('../base-route/base-router');
const urlShorten = require('../routes/urlShorten');

server.use(helmet());
server.use(cors(corsOptions));
server.use(express.json());
server.use(express.static('public'));
server.use(bodyParser.urlencoded({
  extended: true,
}));

server.use('/', cors(), urlShorten);
server.use('/api/base-router', baseRouter);

server.get('/', (req, res) => {
  res.send(`<h1>Welcome to tiny url<h1>`)
});

module.exports = server;