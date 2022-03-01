const MissingParamError = require('./missing-param-error')

module.exports = class HttpResponse {
  static serverError () {
    return {
      name: 'internal server error',
      statusCode: 500,
      data: null
    }
  }

  static notFound (paramName) {
    return {
      name: 'not found',
      statusCode: 404,
      data: paramName
    }
  }

  static unauthorized (paramName) {
    return {
      name: 'unauthorized',
      statusCode: 401,
      data: paramName
    }
  }

  static badRequest (paramName) {
    return {
      name: 'bad request',
      statusCode: 400,
      data: new MissingParamError(paramName)
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
