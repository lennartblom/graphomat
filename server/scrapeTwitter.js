const startDbConnectivity = require("./databaseConnection");

const axios = require('axios');

const bearerToken = process.env.TWITTER_BEARER_TOKEN;
const twitterHandle = "lennartblom";
const requestConfig = {'headers': {
        'Authorization': `Bearer ${bearerToken}`
    }
}

let twitterApiUrl = `https://api.twitter.com/1.1/followers/list.json?cursor=-1&screen_name=${twitterHandle}&skip_status=true&include_user_entities=false`;

let screenNamesToScratch = [];

// TODO should be converted into async await functions
axios.get(twitterApiUrl, requestConfig)
    .then(response => {
        for (const user of response.data.users) {
            screenNamesToScratch.push(user.screen_name);
        }

        console.log("Trying to write relations from @", twitterHandle, "to his/her follower", screenNamesToScratch);
        startDbConnectivity(twitterHandle, screenNamesToScratch, true).then(r => {

            for (const follower of screenNamesToScratch) {
                let followerApiUrl = `https://api.twitter.com/1.1/followers/list.json?cursor=-1&screen_name=${follower}&skip_status=true&include_user_entities=false`;


                axios.get(followerApiUrl, requestConfig)
                    .then(response => {
                        console.log("collection followers from @", follower);
                        let secondLevelScreenNames = [];

                        for (const user of response.data.users) {
                            secondLevelScreenNames.push(user.screen_name);
                        }
                        console.log("Trying to write relations from @", follower, "to his/her follower", secondLevelScreenNames);
                        startDbConnectivity(follower, secondLevelScreenNames, false).then(r => {
                            console.log("Scratch follower of @", follower, "finished")
                        });

                    })
                    .catch(error => {
                        console.log("Unable to request followers from @", follower);
                        console.log(error);
                    });
            }
        });

    })
    .catch(error => {
        console.log("Initial twitter API request did not work out", error);
    });
