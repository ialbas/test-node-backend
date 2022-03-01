const Post = require('../controllers/post')
const Auth = require('../controllers/auth')

// Post Routes
const PostController = new Post()
const AuthController = new Auth()

class Handler {
  async HandlerGetByID (req, res) {
    const httpResponse = await PostController.getById(req.params.id)
    res.status(httpResponse.statusCode).json(httpResponse)
  }

  async HandlerRemove (req, res) {
    const httpResponse = await PostController.remove(req.params.id)
    res.status(httpResponse.statusCode).json(httpResponse)
  }

  async HandlerGetAll (req, res) {
    const httpResponse = await PostController.getAll(
      req.query.page,
      req.query.size
    )
    res.status(httpResponse.statusCode).json(httpResponse)
  }

  async HandlerCreate (req, res) {
    const httpResponse = await PostController.create(req.body)
    res.status(httpResponse.statusCode).json(httpResponse)
  }

  async HandlerUpdate (req, res) {
    const httpResponse = await PostController.update(req.body)
    res.status(httpResponse.statusCode).json(httpResponse)
  }

  async HandlerLogin (req, res) {
    const httpResponse = await AuthController.auth(
      req.body.email,
      req.body.password
    )

    res.status(httpResponse.statusCode).json(httpResponse)
  }
}

module.exports = Handler
