
// Model for interactiong with (GitHub) OAuth API

//Constants for OAuth client
const clientId = "24530571d805bf20f230"
const clientSecret = "44d3dad7e30600442f213974aac34bff0df1bf90"

const fetch = require('node-fetch')

const auth = {

  // Gets an access token from GitHub API based on response code
  getAccessToken: async function getAccessToken (code) {
    const response = await fetch(("https://github.com/login/oauth/access_token"), {
     
        method: "post",
         
        body: JSON.stringify({
          code: code,
          client_id: clientId,
          client_secret:  clientSecret
        }),
        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json"
        }
    });
    console.log(response);
    return await response.json();
  },
  createUser: async function createUser(){

  },
  loginUser: async function loginUser(){
    
  }
}

module.exports = auth
