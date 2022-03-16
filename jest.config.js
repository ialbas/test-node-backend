module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['**/src/**/*.js', '!src/app.js', '!src/routes/auth.js', '!src/routes/post.js', '!src/routes/index.js'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb'
}
