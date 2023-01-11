/* Routes for authenticating users - registering and logging in */

const express = require('express')
const router = express.Router()
const authModel = require('../models/auth.js')

// Register/login with oauth from github.
router.post('/oauth', async function (req, res) {
  const code = req.body.code
  console.log('Oauth login request made')
  const result = await authModel.loginOrRegisterWithOAuthCode(code)
  res.json({ result })
})

// Login to customer account with manually entered email and password.
router.post('/login', async function (req, res) {
  const email = req.body.email
  const password = req.body.password
  console.log('Manual login request made')
  const result = await authModel.attemptLogin(email, password)
  res.json({ result })
})

// Register new customer with manually entered email and password.
router.post('/register', async function (req, res) {
  const userInfo = {
    email: req.body.email,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name
  }
  console.log('Manual registration request made')
  const result = await authModel.attemptRegistration(userInfo)
  console.log(result)
  res.json({ result })
})

router.get('/', async function (req, res) {
  res.json({ result: 'High5 Auth API Route' })
})

module.exports = router
