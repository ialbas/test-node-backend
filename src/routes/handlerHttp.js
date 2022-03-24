const Post = require('../controllers/post')
const Auth = require('../controllers/auth')
const HttpResponse = require('../helpers/http-response')
const TokenHelper = require('../helpers/token-helper')

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
    const httpResponse = await PostController.update(req.params.id, req.body)
    res.status(httpResponse.statusCode).json(httpResponse)
  }

  async HandlerLogin (req, res) {
    const httpResponse = await AuthController.auth(
      req.body.email,
      req.body.password
    )

    res.status(httpResponse.statusCode).json(httpResponse)
  }

  async authTokenVerify (req, res, next) {
    try {
      const authorization = req.headers.authorization
      if (!authorization) {
        res
          .status(401)
          .json(
            HttpResponse.unauthorized('User unauthorized, jwt is required.')
          )
      } else {
        if (authorization) {
          const split = authorization.split('Bearer ')
          const token = split[1]
          if (split.length !== 2) {
            return res
              .status(401)
              .json(
                HttpResponse.unauthorized('No Bearer or token is provided.')
              )
          }

          const tokenHElper = new TokenHelper(process.env.TOKEN_SECRET)
          const verify = await tokenHElper.tokenVerify(token)
          if (verify._id === undefined) {
            res.status(401).json(HttpResponse.unauthorized(`Failed to authenticate token: ${verify.message}`))
            return
          }
          req.userId = verify._id
          next()
        }
      }
    } catch (error) {
      console.error('ERRO: ', error)
    }
    return next
  }
}

module.exports = Handler
