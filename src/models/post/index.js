const PostUseCaseSpy = require('../../models/database/index')

class PostUseCase {
  constructor (httpResquest) {
    this.httpResquest = httpResquest
  }

  async getById (httpResquest) {
    return PostUseCaseSpy(httpResquest.params.id)
  }
}

module.exports = PostUseCase
