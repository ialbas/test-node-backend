const PostRouter = require('./index')
const PostUseCaseSpy = require('../../models/database/PostUseCaseSpy')
const HttpResponse = require('../../helpers/http-response')

const { MongoMemoryServer } = require('mongodb-memory-server')
const MongoHelper = require('../../models/database/mongoHelper')
const { validate } = require('uuid')
/*
describe('Post Router - Ensure that the route `getByID` work correcly', () => {
  test('Should return 400 if no ID is provided ', async () => {
    const sut = new PostRouter()
    const httpResponse = await sut.getById(null)
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
    const httpResponse = await sut.getById(httpRequest.params.id)
    expect(httpResponse.statusCode).toBe(404)
  })
  test('Should return 200 if ID is valid UUID version 4', async () => {
    const sut = new PostRouter()
    const httpRequest = {
      params: {
        id: '09bb1d8c-4965-4788-94f7-31b151eaba4e'
      }
    }
    const httpResponse = await sut.getById(httpRequest.params.id)
    const dbase = new PostUseCaseSpy()
    const result = await dbase.getByIdPost(httpRequest.params.id)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.data.data).toEqual(result.data)
  })
})
describe('Post Router - Ensure that the route `getAll` work correcly', () => {
  test('Should return 500 if `page` and `size` is no provided ', async () => {
    const sut = new PostRouter()
    const httpResponse = await sut.getAll()
    expect(httpResponse.statusCode).toBe(500)
  })
  test('Should return 400 if `page` is integer > 0', async () => {
    const sut = new PostRouter()
    const httpRequest = {
      params: {
        page: 'any_number',
        size: 5
      }
    }
    const httpResponse = await sut.getAll(
      httpRequest.params.page,
      httpRequest.params.size
    )
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return 400 if `size` is integer > 0', async () => {
    const sut = new PostRouter()
    const httpRequest = {
      params: {
        page: 5,
        size: 'any_number'
      }
    }
    const httpResponse = await sut.getAll(
      httpRequest.params.page,
      httpRequest.params.size
    )
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return 404 if not have register', async () => {
    const sut = new PostRouter()
    const httpRequest = {
      params: {
        page: 5,
        size: 5
      }
    }
    const httpResponse = await sut.getAll(
      httpRequest.params.page,
      httpRequest.params.size
    )
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
    const httpResponse = await sut.getAll(
      httpRequest.params.page,
      httpRequest.params.size
    )
    expect(httpResponse.statusCode).toBe(200)
  })
})
describe('Post Router - Ensure that the route `remove` work correcly', () => {
  test('Should return 400 if no ID is provided ', async () => {
    const sut = new PostRouter()
    const httpRequest = {
      params: {}
    }
    const httpResponse = await sut.remove(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return 400 if ID is no valid UUID to version 4', async () => {
    const sut = new PostRouter()
    const httpRequest = {
      params: {
        id: 'invalid_uuid'
      }
    }
    const httpResponse = await sut.remove(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return 404 if ID is valid and register not found', async () => {
    const sut = new PostRouter()
    const httpRequest = {
      params: {
        id: '3603928c-3785-4338-b5dd-447dca646b21'
      }
    }
    const httpResponse = await sut.remove(httpRequest.params.id)
    expect(httpResponse.statusCode).toBe(404)
  })

  test('Should return 204 if ID is valid UUID version 4 and them remove register', async () => {
    const sut = new PostRouter()
    const httpRequest = {
      params: {
        id: '09bb1d8c-4965-4788-94f7-31b151eaba4e'
      }
    }
    const httpResponse = await sut.remove(httpRequest.params.id)
    expect(httpResponse.statusCode).toBe(204)
  })
})
describe('Post Router - Ensure that the route `update` work correcly', () => {

})
*/
describe('Post Router - Ensure that the routes `create`, `update`, `remove`, `getByID`, `getAll` work correcly', () => {
  let connection
  let db
  let mongoServer
  let dataResult
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await MongoHelper.connect(mongoServer.getUri())
    db = await MongoHelper.getCollection('posts')
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
    if (connection) {
      await mongoServer.stop()
    }
  })

  beforeEach(async () => {
    await db.deleteMany
  })

  test('Should return ValidationError and status 400 if any invalid form params, in route  `create`', async () => {
    const sut = new PostRouter()
    const httpRequest = {
      params: {}
    }
    const httpResponse = await sut.create(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return ValidationError and status 400 if there is a `invalid_tag`, in route  `create`', async () => {
    const sut = new PostRouter()
    const httpRequest = {
      params: {
        title: 'any_title',
        body: 'any_body, some_body',
        tags: ['valid_tag_one', 'valid_tag_two', 'invalid_tag']
      }
    }
    const httpResponse = await sut.create(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return ValidationError and status 400 if there is a `invalid_tag`, in route `create`', async () => {
    const sut = new PostRouter()
    const httpRequest = {
      params: {
        title: 'any_title',
        body: 'any_body, some_body',
        tags: ['valid_tag_one', 'valid_tag_two', 'invalid_tag']
      }
    }
    const httpResponse = await sut.create(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return 201 if send valid request, in route  `create`', async () => {
    const sut = new PostRouter()
    const httpRequest = {
      title: 'any_title',
      body: 'any_body, some_body',
      tags: ['valid_tag_one', 'valid_tag_two', 'valid_tag_three']
    }
    const httpResponse = await sut.create(httpRequest)
    dataResult = httpResponse.data
    expect(httpResponse.statusCode).toBe(201)
  })

  test('Should return 400 if no ID is provided, in route `getById`', async () => {
    const sut = new PostRouter()
    const httpResponse = await sut.getById(null)
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return 400 if ID is no valid UUID to version 4, in route  `getById`', async () => {
    const sut = new PostRouter()
    const id = 'invalid_uuid';
    const httpResponse = await sut.getById(id)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return 404 if ID is valid and register not found, in route `getById`', async () => {
    const sut = new PostRouter()
    const id = '392df6dc-ff45-42eb-af76-828f4e1786da';
    const httpResponse = await sut.getById(id)
    expect(httpResponse.statusCode).toBe(404)
  })

  test('Should return 400 if no ID is provided, in route `update`', async () => {
    const sut = new PostRouter()
    const httpRequest = {
      params: {}
    }
    const update = {}
    const httpResponse = await sut.update(httpRequest, update)
    expect(httpResponse.statusCode).toBe(
      HttpResponse.badRequest('id').statusCode
    )
  })
  test('Should return 400 if ID is no valid UUID to version 4, in route `update`', async () => {
    const sut = new PostRouter()
    const update = {}
    const id = 'invalid_uuid';
    const httpResponse = await sut.update(id, update)

    expect(httpResponse.statusCode).toBe(
      HttpResponse.badRequest('id').statusCode
    )
  })
  test('Should return ValidationError and status 400 if any invalid form params, in route `update`', async () => {
    const sut = new PostRouter()
    const httpRequest = {}
    const httpResponse = await sut.update(null, httpRequest)
    expect(httpResponse.statusCode).toBe(
      HttpResponse.badRequest('id').statusCode
    )
  })
  test('Should return status 404 if valid ID has not found, in route `update`', async () => {
    const sut = new PostRouter()
    const id = 'beeb8266-a4fa-4035-b3e7-9b13d6ada59f';
    const httpRequest = {
      title: 'any_title_if_400',
      body: 'any_body, some_body',
      tags: ['valid_tag_one', 'valid_tag_two']
    }
    const httpResponse = await sut.update(id, httpRequest)
    expect(httpResponse.statusCode).toBe(
      HttpResponse.notFound('id').statusCode
    )
  })
  test('Should return ValidationError and status 400 if there is a `invalid_tag`, in route `update`', async () => {
    const sut = new PostRouter()
    const id = '3603928c-3785-4338-b5dd-447dca646b21';
    const body = {
      title: 'any_title',
      body: 'any_body, some_body',
      tags: ['valid_tag_one', 'valid_tag_two', 'invalid_tag']
    }
    const httpResponse = await sut.update(id, body)
    expect(httpResponse.statusCode).toBe(
      HttpResponse.badRequest('id').statusCode
    )
  })
  test('Should return 200 if send valid request, in route `update`', async () => {
    const sut = new PostRouter()
    const { _id } = dataResult
    const body = {
      title: 'any_title_name_modify',
      body: 'any_body, some_body',
      tags: ['valid_tag_one', 'valid_tag_two', 'valid_tag_three']
    }
    if (validate(_id, 4)) {
      const httpResponse = await sut.update(_id, body)
      console.log(_id, httpResponse, dataResult)
      expect(httpResponse.statusCode).toBe(200)
    }
  })
})
