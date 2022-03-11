const PostRouter = require('./index')
const { MongoMemoryServer } = require('mongodb-memory-server')

const MongoHelper = require('../../models/database/mongoHelper')
const validate = require('uuid-validate')

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
    await db.insertMany([{
      title: 'Title one',
      body: 'Description body one',
      tags: ['tagOne', 'tagTwo', 'tagThree']
    },
    {
      title: 'Title two',
      body: 'Description body two',
      tags: ['tagOne', 'tagTwo', 'tagThree']
    },
    {
      title: 'Title three',
      body: 'Description body three',
      tags: ['tagOne', 'tagTwo', 'tagThree']
    },
    {
      title: 'Title four',
      body: 'Description body four',
      tags: ['tagOne', 'tagTwo', 'tagThree']
    },
    {
      title: 'Title five',
      body: 'Description body five',
      tags: ['tagOne', 'tagTwo', 'tagThree']
    }])
  })
  test('Should return ValidationError and status 400 if any invalid form params, in route `create`', async () => {
    const sut = new PostRouter()
    const httpRequest = {
      params: {}
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

  test('Should return 201 if send valid request, in route `create`', async () => {
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
    const id = null
    const httpResponse = await sut.getById(id)
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return 400 if ID is no valid UUID to version 4, in route `getById`', async () => {
    const sut = new PostRouter()
    const id = 'invalid_uuid'
    const httpResponse = await sut.getById(id)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return 404 if ID is valid and register not found, in route `getById`', async () => {
    const sut = new PostRouter()
    const id = '392df6dc-ff45-42eb-af76-828f4e1786da'
    const httpResponse = await sut.getById(id)
    expect(httpResponse.statusCode).toBe(404)
  })
  test('Should return 200 if ID is valid UUID version 4, in route `getById`', async () => {
    const sut = new PostRouter()
    if (validate(dataResult._id)) {
      const id = dataResult._id
      const httpResponse = await sut.getById(id)
      expect(httpResponse.statusCode).toBe(200)
    }
  })
  test('Should return 500 if `page` and `size` is no provided, in route `getAll`', async () => {
    const sut = new PostRouter()
    const httpResponse = await sut.getAll()
    expect(httpResponse.statusCode).toBe(500)
  })
  test('Should return 400 if `page` is integer > 0, in route `getAll`', async () => {
    const sut = new PostRouter()
    const page = 'any_number'
    const size = 5
    const httpResponse = await sut.getAll(page, size)
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return 400 if `size` is integer > 0, in route `getAll`', async () => {
    const sut = new PostRouter()
    const page = 5
    const size = 'any_number'
    const httpResponse = await sut.getAll(page, size)
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return 404 if not have register, in route `getAll`', async () => {
    const sut = new PostRouter()
    const page = 5
    const size = 5
    const httpResponse = await sut.getAll(page, size)
    expect(httpResponse.statusCode).toBe(404)
  })
  test('Should return 200 if `page` and `size` are valide, in route `getAll`', async () => {
    const sut = new PostRouter()
    const page = 1
    const size = 5
    const httpResponse = await sut.getAll(page, size)
    expect(httpResponse.statusCode).toBe(200)
  })
  test('Should return 400 if no ID is provided, in route `remove`', async () => {
    const sut = new PostRouter()
    const id = null
    const httpResponse = await sut.remove(id)
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return 400 if ID is no valid UUID to version 4, in route `remove`', async () => {
    const sut = new PostRouter()
    const id = 'invalid_uuid'
    const httpResponse = await sut.remove(id)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return 404 if ID is valid and register not found, in route `remove`', async () => {
    const sut = new PostRouter()
    const id = '3603928c-3785-4338-b5dd-447dca646b21'
    const httpResponse = await sut.remove(id)
    expect(httpResponse.statusCode).toBe(404)
  })

  test('Should return 204 if ID is valid UUID version 4 and them remove register, in route `remove`', async () => {
    const sut = new PostRouter()
    if (validate(dataResult._id)) {
      const id = dataResult._id
      const httpResponse = await sut.remove(id)
      expect(httpResponse.statusCode).toBe(204)
    }
  })
})
