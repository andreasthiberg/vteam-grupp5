/* Routes for authenticating users - registering and logging in */

const express = require('express');
const bodyParser = require('body-parser');
const router  = express.Router();
const authModel = require('../models/auth.js')

// Register/login with oauth from github
router.post('/oauth', async function(req, res) {
    let code = req.body.code;
    console.log("Oauth login request made")
    let result = await authModel.loginOrRegisterWithOAuthCode(code);
    res.json({result:result});
});

// Login with manually entered email and password
router.post('/login', async function(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    console.log("Manual login request made")
    let result = await authModel.attemptLogin(email,password);
    console.log(result);
    res.json({result:result});
});


router.get('/', async function(req, res) {
    res.json({result:"hej"});
});


module.exports = router;