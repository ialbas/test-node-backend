const validate = require('uuid-validate')

const PostDB = require('../../models/post/index')
const HttpResponse = require('../../helpers/http-response')

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
      if (!body) {
        return HttpResponse.badRequest(body)
      }
      if (body) {
        // producion db
        const business = new PostDB()
        const result = await business.create(body)
        if (result.statusCode === 400) {
          return result
        }
        return HttpResponse.created(result)
      }
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
      if (!id) {
        return HttpResponse.badRequestParam('id')
      }

      if (!validate(id, 4)) {
        return HttpResponse.badRequestParam('id')
      }
      if (!body) {
        return HttpResponse.badRequest(body)
      }

      const model = new PostDB()
      const result = await model.update(id, body)
      if (result.statusCode === 200) {
        return result
      } else {
        return result
      }
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
      if (!id || !validate(id, 4)) {
        return HttpResponse.badRequest('id')
      }
      const model = new PostDB()
      const result = await model.getById(id)

      if (result.statusCode === 200) {
        return HttpResponse.ok(result)
      }
      return result
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
      if (!page && size) {
        return HttpResponse.badRequest('page')
      }
      if (page && !size) {
        return HttpResponse.badRequest('size')
      }
      if (!parseInt(page) > 0) {
        return HttpResponse.badRequest('page')
      }
      if (!parseInt(size) > 0) {
        return HttpResponse.badRequest('size')
      }
      const model = new PostDB()
      const result = await model.getAll(parseInt(page), parseInt(size))

      if (result.statusCode === 200) {
        return HttpResponse.ok(result)
      }
      return result
    } catch (error) {
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
      if (!id || !validate(id, 4)) {
        return HttpResponse.badRequest('id')
      }
      const model = new PostDB()
      const result = await model.remove(id)

      if (result.statusCode === 200) {
        return HttpResponse.ok(result)
      }
      return result
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
module.exports = PostRouter
