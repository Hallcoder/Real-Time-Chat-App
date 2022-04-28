const username = document.getElementById('username');
const form = document.getElementById('register');
const room  = document.getElementById('room')
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = username.value;
    const roomName = room.value;
    fetch('../server.js',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({username:msg, roomName})
    })
    .then(res => res)
    .then(data => {
        data;
        window.location.href = `./chat.html?username=${msg}&room=${roomName}`;
    })
})