const express = require('express')
const router = express.Router()
const authocontrollers = require('../controller/auth-controller.js')
const signUpschema = require("../validator/auth-validator.js")
const validate = require("../middlewares/validate-middle.js")

router.route("/").get(authocontrollers.home)

router.route("/register").post(validate(signUpschema), authocontrollers.register)
router.route("/login").post(authocontrollers.login)

module.exports = router;