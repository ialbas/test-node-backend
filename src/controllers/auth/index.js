const MissingParamError = require('../../helpers/missing-param-error')
const HttpResponse = require('../../helpers/http-response')
const Encripter = require('../../helpers/encrypter')
const TokenGenerator = require('../../helpers/token-generator')
const User = require('../../models/user')

const ENV_SECRET = 'env_my_secret';

class AuthRouter {
  async auth (email, password) {
    if (!email) {
      throw new MissingParamError('email')
    }
    if (!password) {
      throw new MissingParamError('password')
    }

    if (!email) {
      throw new MissingParamError('email')
    }
    const usr = new User()
    const user = await usr.getUserByEmail(email)
    const encripter = new Encripter()
    const isValid = user && (await encripter.compare(password, user.password))

    if (isValid) {
      const tokenGenerator = new TokenGenerator(ENV_SECRET)
      const accessToken = await tokenGenerator.generate(user._id)
      return HttpResponse.ok({ accessToken: accessToken })
    }
    return HttpResponse.unauthorized('Usuário não autorizado.')
  }
}

module.exports = AuthRouter
