/* Routes for authenticating users - registering and logging in */

let express = require('express');
let router = express.Router();
let authModel = require('../models/auth.js')

// Register a new user with email and password
router.post('/access', async function(req, res) {
    let result = await authModel.getAccessToken(req.body.code);
    res.json({result:result});
});

router.get('/', async function(req, res) {
    res.json({result:"hej"});xw
});


module.exports = router;