const express = require("express")
const server = express()

//pasta public
server.use(express.static("public"))

//template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//página inicial
server.get("/", (req, res) => {
    return res.sendFile("index.html")

})

server.get("/create-point", (req, res) => {
    return res.sendFile("create-point.html")

})

//servidor
server.listen(3000)