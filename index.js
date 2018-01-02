var app = require('express')();
var http = require('http').Server(app, {for: "test"});
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var redis = require('socket.io-redis');

const redis_port = 6379;
const redis_host = '127.0.0.1';
const redis_auth_pass = 'wangyunliang'

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
// app.get('/ssl_chat', function (req, res) {
//     res.sendFile(__dirname + '/index.html');
// });

// var pub = redis(redis_port, redis_host, {auth_pass: redis_auth_pass});
// var sub = redis(redis_port, redis_host, {return_buffers: true, auth_pass: redis_auth_pass});
// io.adapter(redis({pubClient: pub, subClient: sub}));
io.adapter(redis({host: redis_host, port: redis_port, auth_pass: redis_auth_pass}));

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        console.log(msg);
        io.emit('chat message', msg);
    });
    io.emit("welcome", "【welcome to here!】");
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

http.listen(port, function () {
    console.log('listening on *:' + port);
});
