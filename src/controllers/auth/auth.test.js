const MissingParamError = require('../../helpers/missing-param-error')
const HttpResponse = require('../../helpers/http-response')
const Encripter = require('../../helpers/encrypter')
const TokenGenerator = require('../../helpers/token-generator')

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
    const isValid = user && await encripter.compare(password, user.password)

    if (isValid) {
      const tokenGenerator = new TokenGenerator('env_my_secret')
      const accessToken = await tokenGenerator.generate(user._id)
      return accessToken
    }
    return HttpResponse.unauthorized('Usuário não autorizado.')
  }
}

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
    const promise = sut.auth()
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  test('Should throw if no `password` is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.auth('any_email@mail.com')
    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })

  test('Should return 401 if email id invalid', async () => {
    const { sut } = makeSut()
    const user = await makeUsers()
    const auth = await sut.auth('outher_email@gmail.com', user.password)
    expect(auth.statusCode).toBe(401)
  })
  test('Should return 401 if password id invalid', async () => {
    const { sut } = makeSut()
    const user = await makeUsers()
    const auth = await sut.auth(user.email, 'outher_password')
    expect(auth.statusCode).toBe(401)
  })

  test('Should return 200 if email and password are correcly', async () => {
    const { sut } = makeSut()
    const user = await makeUsers()
    const accessToken = await sut.auth(user.email, 'any_password')

    expect(accessToken).not.toBeNull()
  })
})
