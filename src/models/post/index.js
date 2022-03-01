const mongoosePaginate = require('mongoose-paginate')
const { connect, model } = require('mongoose')
const db = require('../database/mongodb-connection')
const postSchema = require('./schema')
const HttpResponse = require('../../helpers/http-response')

// Connection MongoDB
connect(process.env.MONGO_STRING_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

class PostDB {
  constructor (httpResquest) {
    this.httpResquest = httpResquest
  }

  /*
  async getById(httpResquest) {
    return PostUseCaseSpy(httpResquest.params.id);
  }
  */
  async create (post) {
    postSchema.options = { id: false }

    try {
      if (post) {
        const result = await post.save()
        return HttpResponse.ok(result)
      }
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = PostDB
