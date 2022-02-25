const MissingParamError = require('./missing-param-error')

module.exports = class HttpResponse {
  static badRequest (paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    }
  }

  static notFound (paramName) {
    return {
      statusCode: 404,
      body: `Not Found - ${paramName}`
    }
  }

  static serverError() {
    return {
      statusCode: 500
    }
  }

  static unauthorizedError() {
    return { statusCode: 401 }
  }

  static ok(body) {
    return {
      statusCode: 200,
      body
    }
  }
}
