const Post = require('../controllers/post')

// Post Routes
const PostController = new Post()

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
}

module.exports = Handler
