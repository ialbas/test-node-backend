const mongoosePaginate = require('mongoose-paginate')
const db = require('../database/mongodb-connection')
const postSchema = require('./schema')
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

class PostDB {
  constructor (httpResquest) {
    this.httpResquest = httpResquest
  }

  /*
  async getById(httpResquest) {
    return PostUseCaseSpy(httpResquest.params.id);
  }
  */
  async create (body) {
    postSchema.options = { id: false }
    try {
      // verifica se o body é valido
      const { error, isValid, client } = validateBody(body)
      if (error) {
        return error
      }

      if (isValid) {
        const result = await client.create(body)
        return result
      }
      return HttpResponse.badRequest()
    } catch (e) {
      console.error(e)
    }
  }

  async update (id, body) {
    try {
      const { error, isValid, client } = validateBody(body)
      if (error) {
        return error
      }
      const find = await client.findOne({ _id: id })
      if (isValid) {
        if (find) {
          const result = await client.update({ _id: id }, body)
          if (result.acknowledged) {
            return HttpResponse.ok(find)
          }
          return HttpResponse.badRequest('update Error')
        }
        return HttpResponse.notFound('id')
      }

      return HttpResponse.serverError()
    } catch (e) {
      console.error(e)
    }
  }

  async getById (id) {
    try {
      const PostModel = db.model('Post', postSchema)
      const find = await PostModel.findOne({ _id: id })
      if (find) {
        return HttpResponse.ok(find)
      }
      return HttpResponse.notFound('id')
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = PostDB
