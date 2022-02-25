const PostRouter = require('../controllers/post/index')
const PostUseCaseSpy = require('../models/database')

describe('Post Router - Ensure that the route getByID can works correcly', () => {
  test('Should return 500 if request is provided ', async () => {
    const sut = new PostRouter()
    const httpResponse = await sut.getById()
    expect(httpResponse.statusCode).toBe(500)
  })
  test('Should return 400 if no ID is provided ', async () => {
    const sut = new PostRouter()
    const httpRequest = {
      params: {}
    }
    const httpResponse = await sut.getById(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return 400 if ID is no valid UUID to version 4', async () => {
    const sut = new PostRouter()
    const httpRequest = {
      params: {
        id: 'invalid_uuid'
      }
    }
    const httpResponse = await sut.getById(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return 404 if ID is valid and register not found', async () => {
    const sut = new PostRouter()
    const httpRequest = {
      params: {
        id: '3603928c-3785-4338-b5dd-447dca646b21'
      }
    }
    const httpResponse = await sut.getById(httpRequest)
    await PostUseCaseSpy(httpRequest.params.id)
    expect(httpResponse.statusCode).toBe(404)
  })

  test('Should return 200 if ID is valid UUID version 4', async () => {
    const sut = new PostRouter()
    const httpRequest = {
      params: {
        id: '09bb1d8c-4965-4788-94f7-31b151eaba4e'
      }
    }
    const httpResponse = await sut.getById(httpRequest)
    const result = await PostUseCaseSpy(httpRequest.params.id)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(result)
  })
})
