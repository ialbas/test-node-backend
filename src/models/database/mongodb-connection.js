require('dotenv').config()
const { connect } = require('mongoose')

// Connection MongoDB
const db = connect(process.env.MONGO_STRING_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

module.exports = db
