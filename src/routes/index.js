const express = require('express')
const routes = express.Router()
const HandlerHttp = require('../helpers/handllerHttp')

// Post Routes
const {
  HandlerGetByID,
  HandlerGetAll,
  HandlerRemove,
  HandlerCreate,
  HandlerUpdate
} = new HandlerHttp()

routes.post('/api/posts', HandlerCreate)
routes.get('/api/posts', HandlerGetAll)
routes.get('/api/posts/:id', HandlerGetByID)
routes.put('/api/posts/:id', HandlerUpdate)
routes.delete('/api/posts/:id', HandlerRemove)

module.exports = routes
