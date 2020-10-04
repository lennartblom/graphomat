const startDbConnectivity = require("./databaseConnection");

const axios = require('axios');

const bearerToken = process.env.TWITTER_BEARER_TOKEN;
const twitterHandle = "lennartblom";
const requestConfig = {'headers': {
        'Authorization': `Bearer ${bearerToken}`
    }
}

function buildTwitterApiRequestUrl(screenName) {
    return `https://api.twitter.com/1.1/followers/list.json?cursor=-1&screen_name=${screenName}&skip_status=true&include_user_entities=false`;
}

let twitterApiUrl = buildTwitterApiRequestUrl(twitterHandle);

let screenNamesToScratch = [];


async function scrapeAndPersistTwitterFollowers(follower) {
    let followerApiUrl = buildTwitterApiRequestUrl(follower)

    const levelTwoResponse = await axios.get(followerApiUrl, requestConfig);
    console.log("Collecting followers from @", follower);
    let secondLevelScreenNames = [];

    for (const user of levelTwoResponse.data.users) {
        console.log("Twitter Follower on layer two found @", user.screen_name);
        secondLevelScreenNames.push(user.screen_name);
    }
    console.log("Trying to write relations from @", follower, "to his/her follower", secondLevelScreenNames);
    await startDbConnectivity(follower, secondLevelScreenNames, false);
}

(async () => {
    try {
        console.log('Start scraping Twitter API');
        const response = await axios.get(twitterApiUrl, requestConfig);

        for (const user of response.data.users) {
            console.log("Twitter Follower found @", user.screen_name);
            screenNamesToScratch.push(user.screen_name);
        }

        console.log("Trying to write relations from @", twitterHandle, "to his/her follower", screenNamesToScratch);
        await startDbConnectivity(twitterHandle, screenNamesToScratch, true);

        for (const follower of screenNamesToScratch) {
            await scrapeAndPersistTwitterFollowers(follower);
        }

    } catch (error) {
        console.log(error);
    }
})();