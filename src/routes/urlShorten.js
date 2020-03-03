const router = require('express').Router();
// const mongoose = require('mongoose');
const validUrl = require('valid-url');
const UrlShorten = require('../models/UrlShorten.js')
const shortId = require('shortid');
const errorUrl = 'http://localhost/error';

// /api/item/:code
router.get('/:id', async (req, res) => {
  const urlCode = req.params.id;
  // check if short code in db
  const item = await UrlShorten.findOne({ urlCode: urlCode }) 
  
      if (item) {
        return res.redirect(item.originalUrl)
      } else {
        return res.redirect(errorUrl)
      }
  })

router.post('/item', async (req, res) => {
  const { originalUrl, shortBaseUrl } = req.body;
  
  if (!validUrl.isUri(shortBaseUrl)) {
    return res.status(401).json('Invalid Base Url');
  }

  const urlCode = shortId.generate(); // to generate short code
  console.log('url code is: ', urlCode); // 5hodr
  const updatedAt = new Date();

  if (validUrl.isUri(originalUrl)) {
    try {
      const item = await UrlShorten.findOne({ originalUrl: originalUrl });
      if (item) {
        res.status(200).json(item)
        } else {
          shortUrl = shortBaseUrl + '/' + urlCode;
          console.log('this is short url: ', shortUrl)
          const item = new UrlShorten({
            originalUrl,
            shortUrl,
            urlCode,
            updatedAt
          });
          await item.save();
          res.status(200).json(item);
        }
    } catch (err) {
        console.log(err);
        res.status(401).json('invalid user id')
    }
  } else {
    return res.status(401).json({ message: 'invalid original URL...'})
  }
});

module.exports = router;