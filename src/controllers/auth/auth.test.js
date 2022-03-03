const MissingParamError = require('../../helpers/missing-param-error')
const TokenGenerator = require('../../helpers/token-generator')
const AuthRouter = require('../auth/index')

const ENV_SECRET = 'env_my_secret'

const loadedCredencials = {
  _id: '3603928c-3785-4338-b5dd-447dca646b21',
  email: 'any_email@mail.com',
  password: '$2a$10$uZBy1bHarJKFQAgfV62A9O1mszHMHfpJQqqGpySFvjkmF7aILcCRm' // any_password
}
class User {
  async getUserByEmail (email) {
    this.email = email
    if (email === loadedCredencials.email) {
      return loadedCredencials
    }
    return null
  }
}
const makeTokenGenerator = () => {
  class TokenGeneratorSpy {
    async generate (userId) {
      this.userId = userId
      return this.accessToken
    }
  }
  const tokenGeneratorSpy = new TokenGeneratorSpy()
  tokenGeneratorSpy.accessToken = '3603928c-3785-4338-b5dd-447dca646b21'
  return tokenGeneratorSpy
}
const makeEncrypter = () => {
  class EncrypterSpy {
    async compare (password, hashedPassword) {
      this.password = password
      this.hashedPassword = hashedPassword
      return this.isValid
    }
  }
  const encrypterSpy = new EncrypterSpy()
  encrypterSpy.isValid = true
  return encrypterSpy
}

const makeUsers = async () => {
  const user = new User()
  const usr = await user.getUserByEmail(loadedCredencials.email)
  return usr
}

const makeSut = () => {
  const sut = new AuthRouter()
  const userCredencials = makeUsers()
  const encrypterSpy = makeEncrypter()
  const tokenGeneratorSpy = makeTokenGenerator()
  return {
    sut,
    userCredencials,
    encrypterSpy,
    tokenGeneratorSpy
  }
}

describe('Auth Router - Ensure that the route `login` work correcly', () => {
  test('Should throw if no `email` is provided', async () => {
    const { sut } = makeSut()
    const auth = await sut.auth()
    expect(auth.statusCode).toBe(400)
  })

  test('Should throw if no `password` is provided', async () => {
    const { sut } = makeSut()
    const auth = await sut.auth('any_email@mail.com')
    expect(auth.statusCode).toBe(400)
  })

  test('Should return 401 if email id invalid', async () => {
    const { sut } = makeSut()
    const auth = await sut.auth('outher_email@gmail.com', 'any_password')
    expect(auth.statusCode).toBe(401)
  })
  test('Should return 401 if password is invalid', async () => {
    const { sut } = makeSut()
    const user = await makeUsers()
    const auth = await sut.auth(user.email, 'invalid_password')
    expect(auth.statusCode).toBe(401)
  })

  test('Should return 200 if email and password are correcly', async () => {
    const { sut } = makeSut()
    const user = await makeUsers()
    const accessToken = await sut.auth(user.email, 'any_password')
    const tokenGenerator = new TokenGenerator(ENV_SECRET)
    const validToken = await tokenGenerator.generate(user._id)
    expect(accessToken).not.toBeNull()
    expect(accessToken.data.accessToken).toBe(validToken)
  })
})
