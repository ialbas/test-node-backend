require('dotenv').config()
const { createConnection } = require('mongoose')

// Connection MongoDB
const db = createConnection(process.env.MONGO_STRING_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

module.exports = db
