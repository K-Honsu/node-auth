const express = require('express')
const global = require('../middlewares/global.middlewares')
const middleware = require('./items.middlewares')
const controller = require('./items.controllers')

const router = express.Router()

router.use(global.apiKey)

router.get('/', controller.GetItems)

router.post('/', global.checkAdmin, middleware.checkSize, controller.createItems)

router.get('/:id', global.checkAdmin, controller.getOneItem)

router.patch('/:id', global.checkAdmin, controller.updateItem)

router.delete('/:id', global.checkAdmin, controller.deleteItem)


module.exports = router