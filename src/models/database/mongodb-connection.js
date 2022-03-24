require('dotenv').config()
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

// get type of connection

let mongoServer
let uriInUse
let notUsed

const connect = async (dbMemory) => {
  mongoServer = await MongoMemoryServer.create()
  mongoServer.getUri()
  uriInUse = dbMemory ? mongoServer.getUri() : process.env.MONGO_STRING_CONNECTION
  notUsed = dbMemory ? process.env.MONGO_STRING_CONNECTION : mongoServer.getUri()
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  return await mongoose.connect(uriInUse, options)
}
const getUris = async () => {
  if (mongoServer) {
    return { uriInUse, notUsed }
  }
}
const close = async () => {
  if (mongoServer) {
    await mongoose.connection.close()
    await mongoServer.stop()
  }
}
const clear = async () => {
  if (mongoServer) {
    const collections = mongoose.connection.collections

    for (const key in collections) {
      const collection = collections[key]
      await collection.deleteMany()
    }
  }
}

module.exports = {
  connect,
  close,
  clear,
  getUris
}
