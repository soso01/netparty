const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/netparty', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', () => {
  console.log("db 접속실패")
})

db.once('open', () => {
  console.log("db 접속성공")
})

module.exports = db