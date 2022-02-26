const HttpResponse = require('../../presentation/helpers/http-response')
const validate = require('uuid-validate')
const PostUseCaseSpy = require('../../models/database/PostUseCaseSpy')
const PostUseCaseSpyList = require('../../models/database/PostUseCaseSpyList')

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

  async getById (httpRequest) {
    try {
      if (!httpRequest.params) {
        return HttpResponse.badRequest('id')
      }
      if (!validate(httpRequest.params.id, 4)) {
        return HttpResponse.badRequest('id')
      }
      const result = await PostUseCaseSpy(httpRequest.params.id)

      if (!result) {
        return HttpResponse.notFound('Registro não encontrado.')
      }
      return HttpResponse.ok(result)
    } catch (error) {
      console.error(error)
      return HttpResponse.serverError()
    }
  }

  async getAll (httpRequest) {
    try {
      if (!httpRequest.params.page) {
        return HttpResponse.badRequest('page')
      }
      if (!httpRequest.params.size) {
        return HttpResponse.badRequest('size')
      }
      if (!parseInt(httpRequest.params.page) > 0) {
        return HttpResponse.badRequest('page')
      }
      if (!parseInt(httpRequest.params.size) > 0) {
        return HttpResponse.badRequest('size')
      }
      const result = await PostUseCaseSpyList(httpRequest.params.page, httpRequest.params.size)

      if (!result) {
        return HttpResponse.notFound('Registro não encontrado.')
      }
      return HttpResponse.ok(result)
    } catch (error) {
      console.error(error)
      return HttpResponse.serverError()
    }
  }
}
module.exports = PostRouter
