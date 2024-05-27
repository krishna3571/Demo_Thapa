const express = require('express')
const router = express.Router()
const authocontrollers = require('../controller/auth-controller.js')

router.route("/").get(authocontrollers.home)

router.route("/register").post(authocontrollers.register)

module.exports = router