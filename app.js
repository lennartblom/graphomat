const axios = require('axios');

axios.get('https://randomuser.me/api/')
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });