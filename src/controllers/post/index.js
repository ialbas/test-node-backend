const HttpResponse = require('../../presentation/helpers/http-response')
const validate = require('uuid-validate')
const PostUseCaseSpy = require('../../models/database/PostUseCaseSpy')
const PostUseCaseSpyList = require('../../models/database/PostUseCaseSpyList')
const postSchema = require('../../models/post/schema')
const { model } = require('mongoose')

class PostRouter {
  /**
   * @name Post.getByID
   * @api {get} /api/post/:id
   * @description Get post by ID
   * @param {string} id UUID version 4
   * @returns {object} {{ id: UUID, title: string, body: string, tags: string[] }}
   */
  constructor ({ postUseCase, validate } = {}) {
    this.postUseCase = postUseCase
    this.validate = validate
  }

  async create (httpRequest) {
    try {
      const { params } = httpRequest
      const PostModel = model('Post', postSchema)
      const clientPost = new PostModel(params)
      const error = clientPost.validateSync()

      if (error) {
        console.error(error)
        const { name, message } = error
        return { name, message, statusCode: 400 }
      }
      const db = new PostUseCaseSpy()
      const result = await db.createPost(clientPost)

      return { data: result, statusCode: 201 }
    } catch (error) {
      console.error(error)
      return HttpResponse.serverError()
    }
  }

  async getById (id) {
    try {
      if (!id) {
        return HttpResponse.badRequest('id')
      }
      if (!validate(id, 4)) {
        return HttpResponse.badRequest('id')
      }
      const db = new PostUseCaseSpy()
      const result = await db.getByIdPost(id)

      if (!result) {
        return HttpResponse.notFound('Registro não encontrado.')
      }
      return HttpResponse.ok(result)
    } catch (error) {
      console.error(error)
      return HttpResponse.serverError()
    }
  }

  async getAll (page, size) {
    try {
      if (!page && !size) {
        return HttpResponse.serverError()
      }
      if (!page) {
        return HttpResponse.badRequest('page')
      }
      if (!size) {
        return HttpResponse.badRequest('size')
      }
      if (!parseInt(page) > 0) {
        return HttpResponse.badRequest('page')
      }
      if (!parseInt(size) > 0) {
        return HttpResponse.badRequest('size')
      }
      const result = await PostUseCaseSpyList(page, size)

      if (!result) {
        return HttpResponse.notFound('Registro não encontrado.')
      }
      return HttpResponse.ok(result)
    } catch (error) {
      console.error(error)
      return HttpResponse.serverError()
    }
  }

  async getRemove (id) {
    try {
      if (!id) {
        return HttpResponse.badRequest('id')
      }
      if (!validate(id, 4)) {
        return HttpResponse.badRequest('id')
      }
      const db = new PostUseCaseSpy()
      const result = await db.getRomovePost(id)

      if (!result) {
        return HttpResponse.notFound('Registro não encontrado.')
      }
      return HttpResponse.noContent()
    } catch (error) {
      console.error(error)
      return HttpResponse.serverError()
    }
  }
}
module.exports = PostRouter
