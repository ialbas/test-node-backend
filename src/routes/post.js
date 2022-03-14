const express = require('express')
const routes = express.Router()

const Post = require('../controllers/post/index')

// Post Routes
const PostController = new Post()

routes.post('/api/posts', PostController.create)
routes.get('/api/posts', PostController.getAll)
routes.get('/api/posts/:id', PostController.getById)
routes.put('/api/posts/:id', PostController.update)
routes.delete('/api/posts/:id', PostController.remove)

module.exports = routes
