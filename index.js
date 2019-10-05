const express = require('express');
const app = express();
const http = require('http').createServer(app);
const port = 3000;
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const io = require('socket.io')(http);


const users = require('./routes/users');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ extended:false }));

connectDB(); //DB connection

io.on('connection', (socket) => {
    console.log('Someone has connected');
   // socket.broadcast.emit('hello..');
    socket.on('disconnect', () => {
        console.log('Someone has disconnected');
    });
});

io.on('connection', (socket) =>{
    socket.on('chat message', (msg) =>{
        console.log('message: ', msg);
        io.emit('chat message', msg);
    });
});

app.get('/', (req, res) => {
    res.send('This is the api home page');
});

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use('/api', users);

http.listen(port, () => {
    console.log('Server and Socket.io running on port ' + port);
});
