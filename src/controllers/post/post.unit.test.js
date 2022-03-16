const PostRouter = require('./index')
const {
  connect,
  close,
  clear
} = require('../../models/database/mongodb-connection')
const validate = require('uuid-validate')
const ServerError = require('../../helpers/server-error')

describe('Post Router - Ensure that the routes `create`, `update`, `remove`, `getByID`, `getAll` work correcly', () => {
  let dataResult
  beforeAll(async () => {
    await connect(true)
  })
  afterAll(async () => {
    await close()
  })

  beforeAll(async () => {
    await clear()
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

  test('Should return 400 if no ID is provided, in route `update`', async () => {
    const sut = new PostRouter()
    const httpRequest = {
      title: 'any_title',
      body: 'any_body, some_body',
      tags: ['valid_tag_one', 'valid_tag_two', 'valid_tag_three']
    }
    const httpResponse = await sut.update(null, httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return 400 if ID is no valid UUID to version 4, in route `update`', async () => {
    const sut = new PostRouter()
    const httpRequest = {
      title: 'any_title',
      body: 'any_body, some_body',
      tags: ['valid_tag_one', 'valid_tag_two', 'valid_tag_three']
    }
    const id = 'invalid_uuid';
    const httpResponse = await sut.update(id, httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return status 400 if ID is valid UUID and any invalid form params, in route `update`', async () => {
    const sut = new PostRouter()
    const httpRequest = {}
    const id = 'b0945cd6-71be-46cc-a5fc-e091888ec931';
    const httpResponse = await sut.update(id, httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return status 404 if valid ID has not found, in route `update`', async () => {
    const sut = new PostRouter()
    const httpRequest = {
      title: 'any_title',
      body: 'any_body, some_body',
      tags: ['valid_tag_one', 'valid_tag_two', 'valid_tag_three']
    }
    const id = '22ccc311-0b99-420c-823a-391038fbc1ea';
    const httpResponse = await sut.update(id, httpRequest)
    expect(httpResponse.statusCode).toBe(404)
  })
  test('Should return status 400 if valid ID has found and there is a `invalid_tag`, in route `update`', async () => {
    const sut = new PostRouter()
    const id = '0888b2c4-86c6-4f69-ad29-bb8a599e2e11';
    const body = {
      title: 'any_title',
      body: 'any_body, some_body',
      tags: ['valid_tag_one', 'valid_tag_two', 'invalid_tag']
    }
    const httpResponse = await sut.update(id, body)
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return 200 if send valid request, in route `update`', async () => {
    const sut = new PostRouter()
    const id = dataResult._id
    const httpRequest = {
      title: 'any_title_name_modify',
      body: 'any_body, some_body',
      tags: ['valid_tag_one', 'valid_tag_two', 'valid_tag_three']
    }
    const httpResponse = await sut.update(id, httpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })

  test('Should return 400 if no ID is provided, in route `getById`', async () => {
    const sut = new PostRouter()
    const id = null
    const httpResponse = await sut.getById(id)
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return 400 if ID is no valid UUID to version 4, in route `getById`', async () => {
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
  test('Should return 400 if `size` is integer > 0 and `page is NaN`, in route `getAll`', async () => {
    const sut = new PostRouter()
    const page = 'any_number';
    const size = 5
    const httpResponse = await sut.getAll(page, size)
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return 400 if `page` is integer > 0 and `size is NaN`, in route `getAll`', async () => {
    const sut = new PostRouter()
    const page = 5
    const size = 'any_number';
    const httpResponse = await sut.getAll(page, size)
    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return 404 if not have register, in route `getAll`', async () => {
    const sut = new PostRouter()
    const page = 300
    const size = 3000
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
    const id = 'invalid_uuid';
    const httpResponse = await sut.remove(id)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return 404 if ID is valid and register not found, in route `remove`', async () => {
    const sut = new PostRouter()
    const id = '9fa146c2-3403-479c-a6de-c2c4b1642872';
    const httpResponse = await sut.remove(id)
    expect(httpResponse.statusCode).toBe(404)
  })

  test('Should return 204 if ID is valid UUID version 4 and them remove register, in route `remove`', async () => {
    const sut = new PostRouter()
    if (validate(dataResult._id)) {
      const id = dataResult._id
      const httpResponse = await sut.remove(id)
      expect(httpResponse.statusCode).toBe(200)
    }
  })

  test('Should return 400 if no body is provided, in route `create`', async () => {
    const sut = new PostRouter()
    const httpResponse = await sut.create(null)
    expect(httpResponse.statusCode).toBe(400)
  })
})
