const axios = require('axios');

const bearerToken = process.env.TWITTER_BEARER_TOKEN;
const twitterHandle = "lennartblom";
const requestConfig = {'headers': {
        'Authorization': `Bearer ${bearerToken}`
    }
}

let twitterApiUrl = `https://api.twitter.com/1.1/followers/list.json?cursor=-1&screen_name=${twitterHandle}&skip_status=true&include_user_entities=false`;

let screenNamesToScratch = [];

axios.get(twitterApiUrl, requestConfig)
  .then(response => {
    for (const user of response.data.users) {
        screenNamesToScratch.push(user.screen_name);
    }

    console.log(screenNamesToScratch);
  })
  .catch(error => {
    console.log(error);
  });