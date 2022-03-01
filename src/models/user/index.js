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

module.exports = User
