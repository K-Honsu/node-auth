const express = require('express')
const middleware = require('./users.middlewares')
const controller = require('./users.controllers')


const router = express.Router()

router.post('/', middleware.validateUserCreation, middleware.checkExistingUser, controller.createUser)


module.exports = router