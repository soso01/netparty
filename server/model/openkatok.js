const mongoose = require('mongoose')

const openkatokSchema = new mongoose.Schema({
  address: {type: String, required: true, trim: true},
  valid: Boolean,
  content: String,
  password: String,
  Date: String
})

const openkatok = mongoose.model("openkatok", openkatokSchema)

module.exports = openkatok