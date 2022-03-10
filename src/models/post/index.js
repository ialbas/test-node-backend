const mongoosePaginate = require('mongoose-paginate')
const db = require('../database/mongodb-connection')
const postSchema = require('./schema')
const HttpResponse = require('../../helpers/http-response')

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
        return result
      }
    } catch (e) {
      console.error(e)
    }
  }

  async update (id, body) {
    // postSchema.options = { id: false }

    try {
      if (body) {
        const find = await body.find({
          _id: 'fa961eb2-b0aa-401d-a07a-7ca04d4bd1f3'
        })
        console.log(find)
        const result = await body.update(body)
        return result
      }
    } catch (e) {
      console.error(e)
    }
  }
  /*
    const Post = db.model('Post', postSchema)

    const find = await Post.find({ _id: id })
    console.log(find)
    try {
      if (!find) {
        return HttpResponse.notFound('id')
      }

      if (find) {
        const result = await Post.updateOne(id, body)
        return result
      }
    } catch (e) {
      console.error(e)
    }
  }
  */
}

module.exports = PostDB
