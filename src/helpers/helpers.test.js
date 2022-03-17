const Encrypter = require('./encrypter')
const TokenGenerator = require('./token-generator')
const MissingParamError = require('./missing-param-error')

describe('Ensure works of Encrypter', () => {
  test('Should retrun MissinParam if no value is provided', async () => {
    const encrypter = new Encrypter()
    const value = null
    const hash = 'any_hash'
    expect(async () => { await encrypter.compare(value, hash) }).rejects.toThrow(new MissingParamError('value'))
  })
  test('Should retrun MissinParam if no hash is provided', async () => {
    const encrypter = new Encrypter()
    const value = 'any_value'
    const hash = null
    expect(async () => { await encrypter.compare(value, hash) }).rejects.toThrow(new MissingParamError('hash'))
  })
  test('Should retrun MissinParam if no params is provided', async () => {
    const encrypter = new Encrypter()
    const value = 'any_value'
    expect(encrypter.compare()).rejects.toThrow(new MissingParamError('value'))
    expect(encrypter.compare(value)).rejects.toThrow(new MissingParamError('hash'))
  })
})

describe('Ensure works of TokenValidator', () => {
  test('Should retrun MissinParam if no secret is provided', async () => {
    const token = new TokenGenerator()
    const promise = token.generate('any_id')
    expect(promise).rejects.toThrow(new MissingParamError('secret'))
  })
  test('Should retrun MissinParam if no id is provided', async () => {
    const token = new TokenGenerator()
    const promise = token.generate()
    expect(promise).rejects.toThrow(new MissingParamError('secret'))
  })
})
