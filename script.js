// script.js
const editor = document.getElementById('editor');
const socket = io();

// Emit event when text is changed
editor.addEventListener('input', () => {
    socket.emit('text-change', editor.value);
});

// Listen for text changes from other clients
socket.on('text-change', (text) => {
    editor.value = text;
});

// Connect to server
socket.on('connect', () => {
    console.log('Connected to server');
});

// Disconnect from server
socket.on('disconnect', () => {
    console.log('Disconnected from server');
});


# Server-side JavaScript (using Node.js and Socket.IO)

// server.js
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Client connected');

    // Broadcast text changes to all connected clients
    socket.on('text-change', (text) => {
        io.emit('text-change', text);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
