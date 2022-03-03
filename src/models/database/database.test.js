const { MongoMemoryServer } = require('mongodb-memory-server')
const { MongoClient } = require('mongodb')

describe('Single MongoMemoryServer', () => {
  let connection
  let db
  let mongoServer

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    connection = await MongoClient.connect(mongoServer.getUri(), {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    db = await connection.db()
  })
  afterAll(async () => {
    await connection.close()
    if (connection) {
      await mongoServer.stop()
    }
  })

  beforeEach(async () => {
    await db.collection('posts').deleteMany
  })
  it('should insert a doc into collection', async () => {
    const posts = db.collection('posts')

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
