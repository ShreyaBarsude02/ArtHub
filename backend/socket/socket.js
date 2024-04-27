const http = require('http');
const express = require('express');
const {Server} = require("socket.io")
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());

const socketUsers = {}

const getSocketId = (id) => {
    const socketID = socketUsers[id]
    return socketID;
}

io.on("connection", (socket)=>{
    console.log("user connected", socket.id)

    const user_id = socket.handshake.query.userID;
    console.log("user_id", user_id)
    if(user_id != "undefined"){
        socketUsers[user_id] = socket.id;
    }
    socket.on("disconnect", ()=>{
        console.log("user disconnected", socket.id)
        delete socketUsers[user_id];
    })
})
module.exports = { app, io, server, getSocketId};