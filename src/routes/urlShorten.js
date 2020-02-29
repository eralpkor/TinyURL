const router = require('express').Router();
// const mongoose = require('mongoose');
const validUrl = require('valid-url');
const UrlShorten = require('../models/UrlShorten.js')
const shortId = require('shortid');
const errorUrl = 'http://localhost/error';

// /api/item/:code
router.get('/item/:code', async (req, res) => {
  const urlCode = req.params.code;
  const item = await UrlShorten.findOne()({ urlCode: urlCode })
  
      if (item) {
        return res.redirect(item.originalUrl)
      } else {
        return res.redirect(errorUrl)
      }
  })

router.post('/item', async (req, res) => {
  const { originalUrl, shortBaseUrl } = req.body;
  if (validUrl.isUri(shortBaseUrl)) {
    } else {
    return res.status(401).json('Invalid Base Url');
  }

  const urlCode = shortId.generate(); // to generate short code
  console.log('url code is: ', urlCode); // 5hodr
  const updatedAt = new Date();

  if (validUrl.isUri(originalUrl)) {
    console.log('original url: ', validUrl.isUri(originalUrl)) // original url
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