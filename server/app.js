const express = require('express');
const cors = require('cors')
const app = express()

app.use(cors())
// app.options('*', cors()) // include before other routes

const port = 3006;

app.get('/getuser', handleGetUser);

function handleGetUser(request, response){
  console.log('node handling request from web client')
  // TODO replace json with function call twitter API from lennart 
  response.json({ username: 'Flavio' })
}

app.listen(port, () => {
  console.log(`\nExample app listening on port ${port}!\n`);
});


/*
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
  
*/