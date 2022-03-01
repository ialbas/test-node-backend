const { Schema } = require('mongoose')
const uuid = require('uuid')

const postSchema = new Schema({
  _id: { type: String, default: () => uuid.v4() },
  title: {
    type: String,
    minLength: [5, 'title too short'],
    maxLength: [30, 'title too long'],
    required: [true, 'title is required']
  },
  body: {
    type: String,
    minLength: [10, 'body too short'],
    maxLength: [144, 'body too long'],
    required: [true, 'body is required']
  },
  tags: {
    type: [String],
    enum: {
      values: [
        'valid_tag_one',
        'valid_tag_two',
        'valid_tag_three',
        'valid_tag_four'
      ],
      message: 'the value `{VALUE}` is not supported.'
    },
    required: [true, "the field `tags` don't contain any of these words: "]
  }
})

module.exports = postSchema
