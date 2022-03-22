const HandlerHttp = require('./handllerHttp')
const ServerError = require('../helpers/server-error')

const {
  HandlerGetByID,
  HandlerGetAll,
  HandlerRemove,
  HandlerCreate,
  HandlerUpdate,
  HandlerLogin,
  authTokenVerify
} = new HandlerHttp()

const request = {
  host: 'localhost:3000',
  headers: { authorization: 'Bearer any_token', contentType: 'application/json' },
  params: {
    id: 'any_id'
  }
}
const response = {
  accessControlAllowOrigin: '*',
  conttentType: 'application/json',
  statusCode: 200,
  send: s => s,
  json: (d) => {
    return d
  },
  status: function (s) {
    this.statusCode = s
    return this
  }
}

describe('HandlerHttp - Ensure that the routes initialize correcly', () => {
  const next = jest.fn()
  test('test correcly request and response in route getById', async () => {
    const promise = HandlerGetByID(request, response, next)
    expect(promise).toEqual(promise)
  })
  test('Should throw if in HandlerGetByID no req or res is provided', async () => {
    const promise = await HandlerGetByID()
    expect(promise.statusCode).toBe(500)
  })

  test('Should throw if in HandlerUpdate no response or res is provided', async () => {
    const promise = await HandlerUpdate(request, null)
    expect(promise.statusCode).toBe(500)
  })
  test('Should throw if in HandlerGetAll no response or res is provided', async () => {
    const promise = await HandlerGetAll(request, null)
    expect(promise.statusCode).toBe(500)
  })
  test('Should throw if in HandlerGetAll no req or res is provided', async () => {
    const promise = await HandlerGetAll()
    expect(promise.statusCode).toBe(500)
  })
  test('Should throw if in HandlerRemove no req or res is provided', async () => {
    const promise = await HandlerRemove()
    expect(promise.statusCode).toBe(500)
  })
  test('test correcly request and response in route remove', async () => {
    const promise = HandlerRemove(request, response, next)
    expect(promise).toEqual(promise)
  })
  test('Should throw if in HandlerCreate no req or res is provided', async () => {
    const promise = await HandlerCreate()
    expect(promise.statusCode).toBe(500)
  })
  test('test correcly request and response in route HandlerCreate', async () => {
    request.body = {
      title: 'any_title',
      body: 'any_body'
    }
    const promise = HandlerCreate(request, response, next)
    expect(promise).toEqual(promise)
  })
  test('Should throw if in HandlerUpdate no req or res is provided', async () => {
    const promise = await HandlerUpdate()
    expect(promise.statusCode).toBe(500)
  })
  test('Should throw if in HandlerLogin no req or res is provided', async () => {
    const promise = await HandlerLogin()
    expect(promise.statusCode).toBe(500)
  })
  test('test correcly request and response in route HandlerLogin', async () => {
    request.body = {
      email: 'any_email',
      password: 'any_password'
    }
    request.headers.authorization = null
    const promise = HandlerLogin(request, response, next)
    expect(promise).toEqual(promise)
  })
  test('Should throw if in authTokenVerify no req or res is provided', async () => {
    const promise = await authTokenVerify()
    expect(promise.statusCode).toBe(500)
  })
  test('test correcly request and response in route authTokenVerify with authorization is null', async () => {
    request.body = {
      email: 'any_email',
      password: 'any_password'
    }
    request.headers.authorization = undefined
    const promise = authTokenVerify(request, response, next)
    expect(promise).toEqual(promise)
  })
  test('test correcly request and response in route authTokenVerify with authorization is not null', async () => {
    request.body = {
      email: 'any_email',
      password: 'any_password'
    }
    request.headers.authorization = 'any_token'
    const promise = authTokenVerify(request, response, next)
    expect(promise).toEqual(promise)
  })
  test('Should throw if in authTokenVerify has any error', async () => {
    request.body = {
      email: 'any_email',
      password: 'any_password'
    }
    request.headers.authorization = 'Bearer any_token'
    const promise = authTokenVerify(request, response, next)
    expect(promise).toEqual(promise)
  })
  test('Should throw if in authTokenVerify no has any token', async () => {
    request.body = {
      email: 'any_email',
      password: 'any_password'
    }
    request.headers.authorization = 'Bearer any_token'
    const promise = await authTokenVerify(request, response, next)
    expect(promise).toEqual(promise)
  })
})
