const PostModel = require('./model')
const HttpResponse = require('../../helpers/http-response')

const validateBody = async (body) => {
  const clientPost = new PostModel(body)

  if (!clientPost) {
    return HttpResponse.serverError()
  }

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
