
// Model for registering and logging in customers

const customerModel = require('./customer');

//Constants for OAuth client
const clientId = "24530571d805bf20f230"
const clientSecret = "44d3dad7e30600442f213974aac34bff0df1bf90"

const fetch = require('node-fetch')
const jwt = require('jsonwebtoken');

const secret = "TempSecret"

const auth = {

  // Gets an access token from GitHub API based on response code
  getAccessToken: async function getAccessToken (code) {
    const response = await fetch(("https://github.com/login/oauth/access_token"), {
     
        method: "POST",
         
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
    return await response.json();
  },
  //Uses access token to get user data from Github API
  getUserInfoFromAPI: async function getUserInfoFromAPI(token){
    const response = await fetch(("https://api.github.com/user"), {
     
    method: "GET",

    // Adding headers to the request
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json",
        "Authorization": "Bearer " + token
    }
    })
    return await response.json();
  },
  createUser: async function createUser(){

  },
  //Creates and returns new JWT token when user login is approved
  loginUser: async function loginUser(email,password=""){
    const payload = {email: email,password:password}
    const token = jwt.sign(payload, secret, { expiresIn: '1h'});
    return ({loginMessage:"Inloggad!",token:token,email:email})
  },
  //Attempts login based on given email and password (not Oauth)
  attemptLogin: async function attemptLogin(email,password){

      return await this.loginUser(email,password);

      //Check if user exists
      let customers = customerModel.getAll()
      let matchingCustomerInfo;

      //Look for matching customer email
      for(key in customers){
        if(customers[key].email === email){
          matchingCustomerInfo = customers[key];
        }
      }

      // Check password if match is found
      if (typeof matchingCustomerInfo !== 'undefined') {
        matchingCustomerInfo.password = "testlösenord";
        if("testlösenord" === matchingCustomerInfo.password){
            loginUser(email);
        }
      }

  },
  loginOrRegisterWithOAuthCode: async function loginOrRegisterWithOAuthCode(code){
    //Get access token from Github
    let accessTokenResult = await this.getAccessToken(code);
    let infoResult = await this.getUserInfoFromAPI(accessTokenResult.access_token);
    let email = infoResult.email;
    let loginResult = await this.loginUser(email);
    return loginResult;
}
}

module.exports = auth
