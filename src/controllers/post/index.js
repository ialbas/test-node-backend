const validate = require('uuid-validate')
const db = require('../../models/database/mongodb-connection')
const PostDB = require('../../models/post/index')
const HttpResponse = require('../../helpers/http-response')
const PostUseCaseSpy = require('../../models/database/PostUseCaseSpy')
const postSchema = require('../../models/post/schema')

const validateBody = (body) => {
  const PostModel = db.model('Post', postSchema)
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

class PostRouter {
  /**
   * @name Post.create
   * @api {post} /api/post
   * @description Create a new post
   * @param {Express<http>} httpRequest request
   * @returns {object} new a registrer { id: UUID, title: string, body: string, tags: string[] }
   */
  async create (body) {
    try {
      const validator = validateBody(body)

      if (validator.error) {
        return validator.error
      }

      if (validator.isValid) {
        // producion db
        const model = new PostDB()
        const result = await model.create(validator.client)
        return HttpResponse.created(result)
      }

      return HttpResponse.serverError()
    } catch (error) {
      return HttpResponse.serverError()
    }
  }

  /**
   * @name Post.update
   * @api {put} /api/post/:id
   * @description Update a post by id
   * @param {string} id a valid UUID version 4
   * @param {Express<http>} httpRequest request
   * @returns {object} new a registrer {{ id: UUID, title: string, body: string, tags: string[] }}
   */
  async update (id, body) {
    try {
      if (!validate(id, 4)) {
        return HttpResponse.badRequestParam('id')
      }
      const validator = validateBody(body)

      if (validator.error) {
        return validator.error
      }

      if (validator.isValid) {
        // producion model
        const model = new PostDB()
        const result = await model.update(id, validator.client)
        return HttpResponse.ok(result)
      }

      return HttpResponse.serverError()
    } catch (error) {
      return HttpResponse.serverError()
    }
  }

  /**
   * @name Post.getByID
   * @api {get} /api/post/:id
   * @description Get post by ID
   * @param {string} id UUID version 4
   * @returns {object} {{ id: UUID, title: string, body: string, tags: string[] }}
   */
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
      return HttpResponse.serverError()
    }
  }

  /**
   * @name Post.getAll
   * @api {get} /api/post?page=1&size=5
   * @description Get all Post with pagination
   * @param {string} page
   * @param {string} size
   * @returns list of Post [{ id: UUID, title: string, body: string, tags: string[] }]
   */
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
      const db = new PostUseCaseSpy()
      const result = await db.getAllPost(parseInt(page), parseInt(size))
      if (!result) {
        return HttpResponse.notFound('Registro não encontrado.')
      }
      return HttpResponse.ok(result)
    } catch (error) {
      console.error(error)
      return HttpResponse.serverError()
    }
  }

  /**
   * @name Post.remove
   * @api {delete} /api/post/:id
   * @description Remove a post by ID
   * @param {string} id a valid UUID verion 4
   * @returns no content after remove a post
   */
  async remove (id) {
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
      return HttpResponse.serverError()
    }
  }
}
module.exports = PostRouter
