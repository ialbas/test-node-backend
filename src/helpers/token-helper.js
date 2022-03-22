const jwt = require('jsonwebtoken')
const MissingParamError = require('./missing-param-error')

module.exports = class TokenHelper {
  constructor (secret) {
    this.secret = secret
  }

  async generate (id) {
    if (!this.secret) {
      throw new MissingParamError('secret')
    }
    if (!id) {
      throw new MissingParamError('id')
    }
    const options = { algorithm: 'HS256', expiresIn: 3600 }
    return jwt.sign({ _id: id }, this.secret, options)
  }

  async tokenVerify (token, secret) {
    const result = jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return err
      }
      return decoded
    })
    return await result
  }
}
