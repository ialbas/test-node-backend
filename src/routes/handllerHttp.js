const Post = require('../controllers/post')
const Auth = require('../controllers/auth')
const HttpResponse = require('../helpers/http-response')
const jwt = require('jsonwebtoken')

// Post Routes
const PostController = new Post()
const AuthController = new Auth()

class Handler {
  async HandlerGetByID (req, res) {
    if (!req || !res) {
      return HttpResponse.serverError()
    }
    const httpResponse = await PostController.getById(req.params.id)
    res.status(httpResponse.statusCode).json(httpResponse)
  }

  async HandlerRemove (req, res) {
    if (!req || !res) {
      return HttpResponse.serverError()
    }
    const httpResponse = await PostController.remove(req.params.id)
    res.status(httpResponse.statusCode).json(httpResponse)
  }

  async HandlerGetAll (req, res) {
    if (!req || !res) {
      return HttpResponse.serverError()
    }
    const httpResponse = await PostController.getAll(
      req.query.page,
      req.query.size
    )
    res.status(httpResponse.statusCode).json(httpResponse)
  }

  async HandlerCreate (req, res) {
    if (!req || !res) {
      return HttpResponse.serverError()
    }
    const httpResponse = await PostController.create(req.body)
    res.status(httpResponse.statusCode).json(httpResponse)
  }

  async HandlerUpdate (req, res) {
    if (!req || !res) {
      return HttpResponse.serverError()
    }
    const httpResponse = await PostController.update(req.params.id, req.body)
    res.status(httpResponse.statusCode).json(httpResponse)
  }

  async HandlerLogin (req, res) {
    if (!req || !res) {
      return HttpResponse.serverError()
    }
    const httpResponse = await AuthController.auth(
      req.body.email,
      req.body.password
    )

    res.status(httpResponse.statusCode).json(httpResponse)
  }

  async authTokenVerify (req, res, next) {
    if (!req || !res) {
      return HttpResponse.serverError()
    }
    try {
      const authorization = req.headers.authorization
      if (!authorization) {
        res.status(401).json(HttpResponse.unauthorized('User unauthorized, jwt token is required.'))
      } else {
        if (authorization) {
          const split = authorization.split('Bearer ')
          if (split.length !== 2) {
            res.status(401).json(HttpResponse.unauthorized('No Bearer or token is provided.'))
            return
          }
          const token = split[1]
          if (!token) {
            res.status(401).json(HttpResponse.unauthorized('No token is provided.'))
          }
          jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) return res.status(401).json(HttpResponse.unauthorized('Failed to authenticate token.'))
            req.userId = decoded._id
            next()
          })
        }
      }
    } catch (error) {
      console.error(error)
    }
    return next
  }
}

module.exports = Handler
