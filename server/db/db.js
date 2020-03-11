const mongoose = require("mongoose")
//mongoose.connect('mongodb://localhost:27017/netparty', { useNewUrlParser: true })
mongoose.connect('mongodb://heroku_fdd65p9g:9d7tmr91n8kuo3279s94nfqda9@ds219078.mlab.com:19078/heroku_fdd65p9g', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', () => {
  console.log("db 접속실패")
})

db.once('open', () => {
  console.log("db 접속성공")
})

module.exports = db 