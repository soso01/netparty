const express = require("express")
const bodyParser = require("body-parser")
const next = require("next")

const db = require("./server/db/db")
const model = require("./server/model")
const api = require("./server/api.js")

const dev = process.env.NODE_ENV === "development"
const port = process.env.PORT || 3000
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  server.use(bodyParser.urlencoded({ extended: true }))
  server.use(bodyParser.json())

  server.use("/api", api)

  server.get("/", (req, res) => {
    return app.render(req, res, "/index", req.query)
  })
  server.get("/make", (req, res) => {
    return app.render(req, res, "/make", req.query)
  })
  server.get("/join", (req, res) => {
    return app.render(req, res, "/join", req.query)
  })
  server.use(handle).listen(port, () => {
    console.log("http://localhost:" + port)
  })
})
