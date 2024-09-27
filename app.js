const express = require('express')
const app = express()
const http = require('http')
const socketIO = require('socket.io')

const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static('public'))

let totalUsers = 0;
const users = {}

io.on('connection', (socket)=>{
    totalUsers++
    console.log(`A user connected ${socket.id}`);
    io.emit('totalUsers', 'Total users - '+ totalUsers)


    socket.on('register', (username) => {
        users[socket.id] = username; // Store the username with the socket ID
    });


    socket.on('chat-msg', (msg)=>{
        io.emit('chat-msg', {message: msg, sender: users[socket.id] || 'Anonymous' })
    })
    


    socket.on('disconnect', ()=>{
        totalUsers--
        io.emit('totalUsers', 'Total users - '+ totalUsers)
        console.log(`A user disconnected ${socket.id}`);
    })
})



server.listen(3000)