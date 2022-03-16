const express = require('express')
const routes = express.Router()
const HandlerHttp = require('./handllerHttp')

// Post Routes
const {
  HandlerGetByID,
  HandlerGetAll,
  HandlerRemove,
  HandlerCreate,
  HandlerUpdate,
  HandlerLogin,
  authTokenVerify
} = new HandlerHttp()

// Route Post
routes.post('/api/posts', authTokenVerify, HandlerCreate)
routes.get('/api/posts', authTokenVerify, HandlerGetAll)
routes.get('/api/posts/:id', authTokenVerify, HandlerGetByID)
routes.put('/api/posts/:id', authTokenVerify, HandlerUpdate)
routes.delete('/api/posts/:id', authTokenVerify, HandlerRemove)

// Route Auth
routes.post('/api/auth/login', HandlerLogin)

module.exports = routes
