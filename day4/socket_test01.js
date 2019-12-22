// socket_test01.js
const http = require('http');
const express = require('express');
const app = express();
const socketio = require('socket.io');
const cors = require('cors');
const router = express.Router();

app.set('port',3000);
app.use(cors());
app.use('/',router);

const server = http.createServer(app);

server.listen(app.get('port'), ()=> {
    console.log(`http://localhost:${app.get('port')}`);
});

const io = socketio.listen(server);

io.sockets.on('connection', (socket)=> {
    console.log('클라이언트에서 요청 들어옴');
    console.dir(socket.request.connection);
})