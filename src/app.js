require('dotenv').config()
const express = require('express')
const cors = require('cors')
const routes = require('../src/routes/index')

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(process.env.PORT || 3000)
console.log(
  `Server running in ${process.env.BASE_URL || 'http://localhost'}:${
    process.env.PORT || 3000
  }`
)

module.exports = app
