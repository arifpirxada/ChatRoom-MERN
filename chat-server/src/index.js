const express = require("express")
const app = express()
const { createServer } = require("http")
const { Server }  = require("socket.io")

const dotenv = require("dotenv")
dotenv.config()
require("./dbConnect.js")

const server = createServer(app)
const io = new Server (server)

const cookieParser = require("cookie-parser")
app.use(cookieParser());
app.use(express.json());

// Routers

const signup = require("./routers/signup.js")
const login = require("./routers/login.js")
const authorize = require("./routers/authorize.js")

app.use(signup)
app.use(login)
app.use(authorize)

app.get("/", (req, res) => {
    res.status(200).send("Hello World!")
})

io.on("connection", (socket) => {
    console.log("user connected")
    socket.on("send message", (data) => {
        socket.emit("receive message", {data})
    })
    insertMessage(data)
})

server.listen(process.env.PORT || 3000, () => {
    console.log("Server listening")
})