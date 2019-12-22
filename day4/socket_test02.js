// socket_test02.js 서버를 서브스태틱으로 
const http = require('http');
const express = require('express');
const app = express();
const socketio = require('socket.io');
const cors = require('cors');
const router = express.Router();
const static = require('serve-static');
const path = require('path');


app.set('port',3000);
app.use(cors());
app.use('/',router);
app.use('/public',static(path.join(__dirname, 'public')));

const server = http.createServer(app);

server.listen(app.get('port'), ()=> {
    console.log(`http://localhost:${app.get('port')}`);
});

const io = socketio.listen(server);

io.sockets.on('connection', (socket)=> {
    console.log('클라이언트에서 요청 들어옴');
    socket.emit('news',{"hello":"world"});
    
    socket.on('client message', (message)=> {
             console.log(message);
             console.log(message.good);
    });
})