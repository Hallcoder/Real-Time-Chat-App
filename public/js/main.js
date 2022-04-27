const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const userList = document.getElementById('users');
const roomName = document.getElementById('room-name')
// / Get username and room from URL 
const {username , room} = Qs.parse(location.search,{
  ignoreQueryPrefix:true
})

const socket = io()

//join chat room
socket.emit('joinRoom',{username , room})


//message from server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);
    //scrolldown
    chatMessages.scrollTop = chatMessages.scrollHeight
})

//message submit
chatForm.addEventListener('submit',e => {
  e.preventDefault();
  let msg = e.target.elements.msg;
  //emit the message to the server
  socket.emit('chatMessage',msg.value)
  msg.value = ' '
})


socket.on('userInfo', ({room , users}) => {
  outputRoomName(room);
  outputUsers(users)
})



//output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML  = `
  <div class="message">
  <p class="meta">${message.username} &nbsp;<span> ${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>
</div>`
document.querySelector('.chat-messages').appendChild(div);
}

//Add room name to DOM
function outputRoomName(room){
roomName.innerText = room
}

function outputUsers(users){
  console.log(users)
  userList.innerHTML = `
  ${users.map(user => `<li>${user.username}</li>`).join(' ')}
  `
}