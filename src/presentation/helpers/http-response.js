const MissingParamError = require('./missing-param-error')

module.exports = class HttpResponse {
  static serverError () {
    return {
      statusCode: 500
    }
  }

  static notFound (paramName) {
    return {
      statusCode: 404,
      body: `Not Found - ${paramName}`
    }
  }

  static badRequest (paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    }
  }

  static ok (body) {
    return {
      statusCode: 200,
      body
    }
  }

  static noContent () {
    return {
      statusCode: 204
    }
  }
}
