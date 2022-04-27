const express = require("express");
const PORT = 5500 || process.env.PORT;
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);
const path = require("path");
const formatMessage = require("./utils/messages");
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require("./utils/users");
const botName = "ChatCord Bot";

//Run when the client connects

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);

    //Welcome current user
    socket.emit("message", formatMessage(botName, "Welcome to ChatCord"));

console.log(user)

//Send users and room info
io.to(user.room).emit('userInfo',{
    room:user.room,
    users:getRoomUsers(room)
})

    //Broadcast when a user connects


    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username}  has joined the chat`)
      );
    });


    //client disconnects

  socket.on("disconnect", () => {
    const user =  userLeave(socket.id)
    if(user){
        io.to(user.room).emit("message", formatMessage(botName, `${user.username} has left the chat`));
        io.to(user.room).emit('userInfo',{
            room:user.room,
            users:getRoomUsers()
        })
        
    }
  });





  //listen for chat messages


  socket.on("chatMessage", (message) => {
    const user  = getCurrentUser(socket.id)
    io.to(user.room).emit("message", formatMessage(user.username, message));
  });
});

app.use(express.static(path.join(__dirname, "public")));
console.log(path.join(__dirname, "public"));
server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
