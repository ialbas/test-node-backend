require('dotenv').config()
const { createConnection } = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

// Connection MongoDB Memory
const db = async () => {
  const mongoServer = await MongoMemoryServer.create()
  const conn = await createConnection(mongoServer.getUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  return conn
}

module.exports = db
