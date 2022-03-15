/*
const { MongoMemoryServer } = require('mongodb-memory-server')
const MongoHelper = require('./mongoHelper')
describe('Single MongoMemoryServer', () => {
  let connection
  let db
  let mongoServer

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await MongoHelper.connect(mongoServer.getUri())
    db = await MongoHelper.getCollection('posts')
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
    if (connection) {
      await mongoServer.stop()
    }
  })

  beforeEach(async () => {
    await db.deleteMany
  })
  it('should insert a doc into collection Post', async () => {
    const posts = db

    const mockPost = {
      _id: 'some-user-id',
      title: 'news intitle',
      body: 'news in body',
      tags: ['valid_tag_one', 'valid_tag_two']
    }
    await posts.insertOne(mockPost)

    const insertedPost = await posts.findOne({ _id: 'some-user-id' })
    expect(insertedPost).toEqual(mockPost)
  })
})
*/
