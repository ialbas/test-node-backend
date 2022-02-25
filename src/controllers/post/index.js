const HttpResponse = require('../../presentation/helpers/http-response')
const validate = require('uuid-validate')

class PostRouter {
  /**
   * @name Post.getByID
   * @api {get} /api/post/:id
   * @description Get post by ID
   * @param {string} id UUID version 4
   * @returns {object} {{ id: UUID, title: string, body: string, tags: string[] }}
  */
  constructor({ postUseCase, validate } = {}) {
    this.postUseCase = postUseCase
    this.validate = validate
  }

  async getById(httpRequest) {
    try {
      if (!httpRequest || !httpRequest.params) {
        return HttpResponse.badRequest('id')
      }
      if (!validate(httpRequest.params.id, 4)) {
        return HttpResponse.badRequest('id')
      }
      const result = await this.postUseCase.getById(httpRequest.params.id)
      if (!result) {
        return HttpResponse.notFound('Registro não encontrado.')
      }

      return HttpResponse.ok(result)
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}

module.exports = { PostRouter }
