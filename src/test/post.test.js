const PostRouter = require('../controllers/post/index')
const PostUseCaseSpy = require('../models/database/PostUseCaseSpy')
const PostUseCaseSpyList = require('../models/database/PostUseCaseSpyList')

describe('Post Router - Ensure that the route `getByID` work correcly', () => {
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
describe('Post Router - Ensure that the route `getAll` work correcly', () => {
  test('Should return 500 if request is provided ', async () => {
    const sut = new PostRouter()
    const httpResponse = await sut.getById()
    expect(httpResponse.statusCode).toBe(500)
  })
  test('Should return 400 if `page` and `size` is no provided ', async () => {
    const sut = new PostRouter()
    const httpRequest = {
      params: {}
    }
    const httpResponse = await sut.getAll(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return 400 if `page` is integer > 0', async () => {
    const sut = new PostRouter()
    const httpRequest = {
      params: {
        page: 'any_number',
        size: 5
      }
    }
    const httpResponse = await sut.getAll(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.message).toEqual('Missing param: page')
  })
  test('Should return 400 if `size` is integer > 0', async () => {
    const sut = new PostRouter()
    const httpRequest = {
      params: {
        page: 5,
        size: 'any_number'
      }
    }
    const httpResponse = await sut.getAll(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.message).toEqual('Missing param: size')
  })
  test('Should return 404 if not have register', async () => {
    const sut = new PostRouter()
    const httpRequest = {
      params: {
        page: 2,
        size: 4
      }
    }
    const httpResponse = await sut.getAll(httpRequest)
    await PostUseCaseSpyList(httpRequest)
    expect(httpResponse.statusCode).toBe(404)
  })

  test('Should return 200 if `page` and `size` are valide ', async () => {
    const sut = new PostRouter()
    const httpRequest = {
      params: {
        page: 1,
        size: 5
      }
    }
    const httpResponse = await sut.getAll(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })
})
