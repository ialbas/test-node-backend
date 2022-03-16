const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

// get type of connection

let mongoServer

const connect = async (testURI) => {
  mongoServer = await MongoMemoryServer.create()
  const uri = testURI ? mongoServer.getUri() : process.env.MONGO_STRING_CONNECTION
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  return await mongoose.connect(uri, options)
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
  clear
}
