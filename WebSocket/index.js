import express from "express";
import http from 'http';
import { send } from "process";
import path from 'path';
import { Server } from "socket.io";

const app =express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve('./public')));

io.on('connection', (socket) => {
    // console.log('a user connected -' , client.id);
    socket.on('user-message',(message)=>{
        // console.log("user sent a message - ",message);
        io.emit('message',message);
    })
  });

app.get('/',(req,res)=>{
    return res.sendFile('./public/index.html');
})



server.listen(9000,()=>{
    console.log('server running on 8000');
})