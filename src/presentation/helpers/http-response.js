const MissingParamError = require('./missing-param-error')

module.exports = class HttpResponse {
  static serverError () {
    return {
      name: '500 Internal Server Error',
      statusCode: 500,
      body: null
    }
  }

  static notFound (paramName) {
    return {
      name: '404 Not Found',
      statusCode: 404,
      body: paramName
    }
  }

  static badRequest (paramName) {
    return {
      name: '400 Bad Request',
      statusCode: 400,
      body: new MissingParamError(paramName)
    }
  }

  static ok (body) {
    return {
      name: '200 Ok',
      statusCode: 200,
      body
    }
  }

  static created (body) {
    return {
      name: '201 Created',
      statusCode: 201,
      body
    }
  }

  static noContent () {
    return {
      name: '204 No Content',
      statusCode: 204,
      body: null
    }
  }
}
