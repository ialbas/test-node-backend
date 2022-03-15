const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

// get type of connection

let mongoServer

const connect = async () => {
  mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri()
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  return await mongoose.connect(uri, options)
};

const close = async () => {
  if (mongoServer) {
    await mongoose.connection.dropDatabase()
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
