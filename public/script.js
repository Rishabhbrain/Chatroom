//const socket = io('http://localhost:3000');
const socket = io('https://chatroom-u3ci.onrender.com/');

const usernameInput = document.getElementById('username');
const setUsernameBtn = document.getElementById('set-username-btn');
const codeInput = document.getElementById('code');
const joinBtn = document.getElementById('join-btn');
const messageInput = document.getElementById('message');
const sendBtn = document.getElementById('send-btn');
const chatbox = document.getElementById('chatbox');

let username = '';

setUsernameBtn.addEventListener('click', () => {
    const name = usernameInput.value.trim();
    if (name) {
        username = name;
        usernameInput.style.display = 'none';
        setUsernameBtn.style.display = 'none';
        codeInput.style.display = 'block';
        joinBtn.style.display = 'block';
    }
});

joinBtn.addEventListener('click', () => {
    const code = codeInput.value.trim();
    if (code && username) {
        socket.emit('join', { code, username });
    }
});

sendBtn.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('message', { code: codeInput.value, text: message, username });
        messageInput.value = '';
    }
});

socket.on('joined', (code) => {
    console.log(`Joined chatroom ${code}`);
});

socket.on('message', (message) => {
    const chatMessage = document.createElement('div');
    chatMessage.innerHTML = `<strong>${message.username}:</strong> ${message.text}`;
    chatbox.appendChild(chatMessage);
    chatbox.scrollTop = chatbox.scrollHeight;
});
