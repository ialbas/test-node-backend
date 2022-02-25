const PostRouter = require('../controllers/post')
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

const PostUseCaseSpy = () => {
  const post = new Post()
  post.id = '09bb1d8c-4965-4788-94f7-31b151eaba4e'
  post.title = 'My first Post'
  post.body = 'Description of my post'
  post.tags = ['tag1', 'tag2', 'tag3']

  return post
}
describe('Post Router', () => {
  test('Should return 400 if request is provided ', () => {
    const sut = new PostRouter() // quem quero testar?
    const httpResponse = sut.getById()
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return 400 if no ID is provided ', () => {
    const sut = new PostRouter()
    const httpRequest = {
      params: {}
    }
    const httpResponse = sut.getById(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return 400 if ID is no valid to version 4', () => {
    const sut = new PostRouter()
    const httpRequest = {
      params: {
        id: 'any_id'
      }
    }
    const httpResponse = sut.getById(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return 200 if ID is valid UUID version 4', () => {
    const sut = new PostRouter()
    const httpRequest = {
      params: {
        id: '09bb1d8c-4965-4788-94f7-31b151eaba4e'
      }
    }
    const httpResponse = sut.getById(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(PostUseCaseSpy())
  })
})
