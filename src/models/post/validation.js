const postSchema = require('./schema')
const db = require('../database/mongodb-connection')
const HttpResponse = require('../../helpers/http-response')

const validateBody = (body) => {
  const PostModel = db.model('Post', postSchema)
  const clientPost = new PostModel(body)

  if (!clientPost) {
    return HttpResponse.serverError()
  }

  const error = clientPost.validateSync()

  const result = {
    isValid: true,
    error: null,
    client: PostModel
  }

  if (error) {
    const { message } = error
    result.isValid = false
    result.error = HttpResponse.badRequestParam(message)
  }

  return result
}

module.exports = validateBody
