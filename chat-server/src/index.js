const express = require("express")
const app = express()
const { createServer } = require("http")
const { Server }  = require("socket.io")

const dotenv = require("dotenv")
dotenv.config()
require("./dbConnect.js")

const server = createServer(app)
const io = new Server (server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
})


const cookieParser = require("cookie-parser")
app.use(cookieParser());
app.use(express.json());
app.use(express.static("./dist"))

// method
const insertMessage = require("./methods/message.js")

// Routers

const signup = require("./routers/signup.js")
const login = require("./routers/login.js")
const authorize = require("./routers/authorize.js")
const logout = require("./routers/logout.js")
const readMessages = require("./routers/readMessages.js")

app.use(signup)
app.use(login)
app.use(authorize)
app.use(logout)
app.use(readMessages)

app.get("/api", (req, res) => {
    res.status(200).send("Hello World!")
})

const users = {}

io.on("connection", (socket) => {
    socket.on("connectUser", (name) => {
        users[socket.id] = name;
        socket.emit("makeUserOnline")
        socket.broadcast.emit("userConnected", name)
    })
    socket.on("send message", async (data) => {
        try {
            socket.broadcast.emit("receive message", data)
            await insertMessage(data)
        } catch (error) {
            console.log(error)
        }
    })
    socket.on("disconnect", () => {
        socket.broadcast.emit("userDisconnected", users[socket.id])
        delete users[socket.id]
    })
})

app.get("/api/online-users", (req, res) => {
    try {
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(400).json({message: "server error"})
    }
})

server.listen(process.env.PORT || 3000, () => {
    console.log("Server listening")
})