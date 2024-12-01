const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

let chatrooms = {};

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('join', ({ code, username }) => {
        if (!chatrooms[code]) {
            chatrooms[code] = [];
        }

        chatrooms[code].push(socket);
        socket.username = username; // Store the username in the socket
        socket.emit('joined', code);
    });

    socket.on('message', (message) => {
        const code = message.code;
        const text = message.text;

        if (chatrooms[code]) {
            chatrooms[code].forEach((client) => {
                client.emit('message', { text, username: socket.username }); // Send username with the message
            });
        } else {
            console.log(`Chat room ${code} does not exist`);
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen("https://chatroom-u3ci.onrender.com/", () => {
    console.log('Server listening on port 3000');
});
