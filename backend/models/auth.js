
// Model for registering and logging in customers

// Imports
const fetch = require('node-fetch')
const jwt = require('jsonwebtoken');
const customerModel = require('./customer');

// Constants for OAuth client
const clientId = "24530571d805bf20f230"
const clientSecret = "44d3dad7e30600442f213974aac34bff0df1bf90"

// Secret used for generating JWTs.
const secret = "tempJWTsecret"

// Hash password tools.
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const auth = {

  // Gets an access token from GitHub API based on OAuth response code.
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

  // Uses OAuth access token to get user data from Github API.
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

  // Creates and returns new JWT token when user login is approved.
  loginUser: async function loginUser(email,password=""){
    const payload = {email: email,password:password}
    const token = jwt.sign(payload, secret, { expiresIn: '1h'});
    return ({loginMessage:"Inloggad!",token:token,email:email})
  },

  // Attempts to log in based on given email and password (not Oauth).
  attemptLogin: async function attemptLogin(email,password){

      // Check if user exists.
      let customers = await customerModel.getAll()
      let matchingCustomerInfo = {}
      let matchFound = false

      // Look for matching customer email.
      for(let key in customers){
        if(customers[key].email === email){
          matchFound = true
          matchingCustomerInfo = customers[key];
        }
      }

      // Check password against stored hash if match is found.
      if (matchFound) {
        hash = matchingCustomerInfo.password
        bcrypt.compare(password, hash, async(err, check) => {
            if(check){
              loginUser(email);
              return ({loginMessage:"Inloggad!"})
            } else {
              return ({loginMessage:"Fel lösenord!"})
            }
        })
      } else {
        return ({loginMessage:"Användaren finns inte!"})
      }

  },

  // Attempts to register new account based on given email and password (not Oauth).
  attemptRegistration: async function attemptRegistration(userInfo){

      // Check if user already exists.
      let customers = await customerModel.getAll()
      let matchFound = false

      // Look for matching customer email.
      for(let key in customers){
        if(customers[key].email === userInfo.email){
          matchFound = true
        }
      }

      // Register if email isn't already in database
      if (matchFound) {
        return ({registerMessage:"En användare med din e-mail finns redan."})
      }

      let hashedPassword;
        
      bcrypt.hash(password, saltRounds, async(err, hash) => {
           hashedPassword = hash;
           userInfo.hashedPassword = hashedPassword
          await customerModel.addCustomer(userInfo)
          return ({registerMessage:"Registrerad!"})
      });
  },

  // Login or register (if no matching user) using an OAuth response code.
  loginOrRegisterWithOAuthCode: async function loginOrRegisterWithOAuthCode(code){

    // Get access token from Github.
    let accessTokenResult = await this.getAccessToken(code);
    let infoResult = await this.getUserInfoFromAPI(accessTokenResult.access_token);
    let email = infoResult.email;

    // Check if user exists.
    let customers = await customerModel.getAll()
    let matchFound = false

    for(let key in customers){
      if(customers[key].email === email){
        matchFound = true
      }
    }

    // Login or add user and then login.
    let loginResult;
    if (matchFound) {
      loginResult = await this.loginUser(email);
    } else {
      await customerModel.addCustomer({email:email})
      loginResult = await this.loginUser(email);
      loginResult.loginMessage = "Konto skapat!"
    }
    console.log(loginResult)
    return loginResult;
}
}

module.exports = auth
