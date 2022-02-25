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

const PostUseCaseSpy = async (id) => {
  const post = new Post()
  post.id = '09bb1d8c-4965-4788-94f7-31b151eaba4e';
  post.title = 'My first Post';
  post.body = 'Description of my post';
  post.tags = ['tag1', 'tag2', 'tag3']

  if (id === post.id) return await post
  return null
};

module.exports = PostUseCaseSpy
