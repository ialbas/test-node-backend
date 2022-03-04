const postSchema = require('./schema')
const { model } = require('mongoose')
const HttpResponse = require('../../helpers/http-response')

const validateBody = (body) => {
  const PostModel = model('Post', postSchema)
  const clientPost = new PostModel(body)
  const error = clientPost.validateSync()

  const result = {
    isValid: true,
    error: null,
    client: clientPost
  }

  if (error) {
    const { message } = error
    result.isValid = false
    result.error = HttpResponse.badRequestParam(message)
  }

  return result
};

module.exports = validateBody
