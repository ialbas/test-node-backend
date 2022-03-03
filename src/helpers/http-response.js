const MissingParamError = require('./missing-param-error')
const UnsupportedParamError = require('./unsupported-param')

module.exports = class HttpResponse {
  static serverError () {
    return {
      name: 'internal server error',
      statusCode: 500,
      error: 'unexpected error'
    }
  }

  static notFound (paramName) {
    return {
      name: 'not found',
      statusCode: 404,
      error: paramName
    }
  }

  static unauthorized (paramName) {
    return {
      name: 'unauthorized',
      statusCode: 401,
      error: paramName
    }
  }

  static badRequest (paramName) {
    return {
      name: 'bad request',
      statusCode: 400,
      error: new MissingParamError(paramName)
    }
  }

  static badRequestParam (paramName) {
    return {
      name: 'bad request',
      statusCode: 400,
      error: new UnsupportedParamError(paramName)
    }
  }

  static ok (data) {
    return {
      name: 'ok',
      statusCode: 200,
      data
    }
  }

  static created (data) {
    return {
      name: 'created',
      statusCode: 201,
      data
    }
  }

  static noContent () {
    return {
      name: 'no contet',
      statusCode: 204,
      data: null
    }
  }
}
