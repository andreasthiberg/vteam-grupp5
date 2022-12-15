/* Routes for authenticating users - registering and logging in */

const express = require('express');
const router  = express.Router();
const authModel = require('../models/auth.js')

// Register/login with oauth from github.
router.post('/oauth', async function(req, res) {
    let code = req.body.code;
    console.log("Oauth login request made")
    let result = await authModel.loginOrRegisterWithOAuthCode(code);
    res.json({result:result});
});

// Login to customer account with manually entered email and password.
router.post('/login', async function(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    console.log("Manual login request made")
    let result = await authModel.attemptLogin(email,password);
    res.json({result:result});
});

// Register new customer with manually entered email and password.
router.post('/register', async function(req, res) {
    let userInfo = {email:req.body.email,
    password:req.body.password,
    first_name:req.body.first_name,
    last_name:req.body.last_name}
    console.log("Manual registration request made")
    let result = await authModel.attemptRegistration(userInfo);
    res.json({result:result});
});

router.get('/', async function(req, res) {
    res.json({result:"High5 Auth API Route"});
});


module.exports = router;