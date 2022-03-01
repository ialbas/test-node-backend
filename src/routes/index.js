const express = require('express')
const routes = express.Router()
const HandlerHttp = require('../helpers/handllerHttp')

// Post Routes
const {
  HandlerGetByID,
  HandlerGetAll,
  HandlerRemove,
  HandlerCreate,
  HandlerUpdate,
  HandlerLogin
} = new HandlerHttp()

// Route Post
routes.post('/api/posts', HandlerCreate)
routes.get('/api/posts', HandlerGetAll)
routes.get('/api/posts/:id', HandlerGetByID)
routes.put('/api/posts/:id', HandlerUpdate)
routes.delete('/api/posts/:id', HandlerRemove)

// Route Auth
routes.post('/api/auth/login', HandlerLogin)

module.exports = routes
