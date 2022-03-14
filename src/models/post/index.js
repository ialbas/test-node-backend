
const db = require('../database/mongodb-connection')
const validateBody = require('../post/validation')
const postSchema = require('./schema')
const HttpResponse = require('../../helpers/http-response')

class PostDB {
  constructor (httpResquest) {
    this.httpResquest = httpResquest
  }

  async create (body) {
    postSchema.options = { id: false }
    try {
      const { error, isValid, client } = validateBody(body)
      if (error) {
        return error
      }
      if (isValid) {
        const result = await client.create(body)

        return { _id: result._id, title: result.title, body: result.body, tags: result.tags }
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
          const result = await client.updateOne({ _id: id }, body)
          if (result.acknowledged) {
            const newResult = await client.find({ _id: id }, body)

            return HttpResponse.ok(newResult)
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

  async remove (id) {
    try {
      const PostModel = db.model('Post', postSchema)
      const find = await PostModel.findOne({ _id: id })
      if (find) {
        const remove = await PostModel.deleteOne({ _id: id })

        if (remove) {
          return HttpResponse.ok(remove)
        }
      }
      return HttpResponse.notFound('id')
    } catch (e) {
      console.error(e)
    }
  }

  async getAll (page, size) {
    try {
      const PostModel = db.model('Post', postSchema)

      const offset = size * (page - 1)
      const options = {
        sort: { date: -1 },
        select: 'title body tags',
        lean: false,
        offset,
        limit: size
      }

      const result = await PostModel.paginate({}, options, async (_err, res) => {
        return await res
      })
      if (result.docs.length > 0) {
        return HttpResponse.ok(result)
      }

      return HttpResponse.notFound('page or size')
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = PostDB
