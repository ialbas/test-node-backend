/**
 * classe Post
 */
class Post {
  /**
   * @param  {String} id
   * @param  {String} title
   * @param  {String} body
   * @param  {[String]} tags
   */
  constructor (id, title, body, tags) {
    this.id = id
    this.title = title
    this.body = body
    this.tags = tags
  }
}

class PostUseCase {
  async createPost (newPost) {
    const post = new Post()

    post.id = '09bb1d8c-4965-4788-94f7-31b151eaba4e';
    post.title = newPost.title
    post.body = newPost.body
    post.tags = newPost.tags

    return await post
  }

  async editPost (id, newPost) {
    const post = new Post()

    post.id = '09bb1d8c-4965-4788-94f7-31b151eaba4e';
    post.title = newPost.title
    post.body = newPost.body
    post.tags = newPost.tags

    if (id === post.id) return await post
    return null
  }

  async getByIdPost (id) {
    const post = new Post()
    post.id = '09bb1d8c-4965-4788-94f7-31b151eaba4e';
    post.title = 'My first Post';
    post.body = 'Description of my post';
    post.tags = ['tag1', 'tag2', 'tag3']

    if (id === post.id) {
      return await {
        id: post.id,
        title: post.title,
        body: post.body,
        tags: post.tags
      }
    }
    return null
  }

  async getAllPost (page, size) {
    const post = new Post()
    const post1 = new Post()
    const result = []

    post.id = '09bb1d8c-4965-4788-94f7-31b151eaba4e';
    post.title = 'My first Post';
    post.body = 'Description of my post';
    post.tags = ['tag1', 'tag2', 'tag3']

    result.push(post)

    post1.id = '09bb1d8c-4965-4788-94f7-31b151eaba4e';
    post1.title = 'My first Post';
    post1.body = 'Description of my post';
    post1.tags = ['tag1', 'tag2', 'tag3']

    result.push(post1)
    if (parseInt(page) === 1 && parseInt(size) === 5) return await result
    return null
  }

  async getRomovePost (id) {
    if (id === '09bb1d8c-4965-4788-94f7-31b151eaba4e') {
      return { data: `id: '${id}' was removed.` }
    }
  }
}

module.exports = PostUseCase
