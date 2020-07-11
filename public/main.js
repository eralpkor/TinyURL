const host = 'http://localhost:4000/item';
const shorBaseUrl = 'http://localhost:4000';
// const axios = require('axios');
const longUrl = document.getElementById('urlinput');

const handleChange = e => {
  const value = longUrl.value;
  console.log(value)
  return value;
}

var original = handleChange();

async function shortUrl(url = '', data = {originalUrl: original, shortBaseUrl: shortBaseUrl }) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
  console.log('This is the response: ', response.body)
  return response.json();
}

shortUrl(host, shorBaseUrl)
  .then(data => {
    console.log('this is the data: ', data)
  })
  .catch(err => {
    console.log(err)
  })