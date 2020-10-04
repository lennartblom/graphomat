
const axios = require('axios')
const express = require('express');
const cors = require('cors')
const app = express()

app.use(cors())
// app.options('*', cors()) // include before other routes

const port = 3006;

app.get('/getuser', handleGetUser);

app.listen(port, () => {
  console.log(`\nExample app listening on port ${port}!\n`);
});


function handleGetUser(request, response){
  // TODO replace json with function call twitter API from lennart 
  // response.json({ username: 'Flavio' })

  //TODO read twitterhandle from POST request

  const bearerToken = process.env.TWITTER_BEARER_TOKEN;
  const twitterHandle = "danabramov";
  const requestConfig = {'headers': {
          'Authorization': `Bearer ${bearerToken}`
      }
  }
  
  let twitterApiUrl = `https://api.twitter.com/1.1/followers/list.json?cursor=-1&`+
  `screen_name=${twitterHandle}&skip_status=true&include_user_entities=false`;
  
  let screenNamesToScratch = [];
  
  // @ts-ignore
  axios.get(twitterApiUrl, requestConfig)
    .then(response => {
      for (const user of response.data.users) {
          screenNamesToScratch.push(user.screen_name);
      }
  
      console.log(screenNamesToScratch);

      response.json({ users: screenNamesToScratch })
    })
    .catch(error => {
      console.log(error);
    });
}
