import './styles/index.scss'
import axios from 'axios'

const serverDomain = 'http://localhost'
const serverPort = 3006
const serverUrl = `${serverDomain}:${serverPort}`

const axiosConfig = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
}

document.getElementById('twitter-handle-btn').addEventListener('click', (event) => {
    console.log('ok cool')
    console.log('click', event)

    axios.get('http://localhost:3006/getuser', axiosConfig) //TODO post name to node server
        .then(response => {
            console.log(response.data);

            alert(response.data.users)
        })
        .catch(error => {
            console.log(error);
        });

    //getUser()
})

// async function getUser() {
//     const twitterHandleInput: HTMLInputElement = document.getElementById('twitter-handle') as HTMLInputElement

//     console.log(twitterHandleInput)

//     if (twitterHandleInput == null) {
//         throw 'input element not found!'
//     }

//     const twitterHandleVal = twitterHandleInput.value
//     if (twitterHandleVal == null || twitterHandleVal == '') {
//         throw `Twitter Username '${twitterHandleVal}' not found`
//     }

//     const user = await axios.get(`${serverUrl}/getuser${twitterHandleVal}`)
//     console.log(user)
// }
