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
const userRouter = require('./controllers/users');
const db = require("./utils/db");
const rooms = require("./controllers/rooms");
const { config } = require("./utils/config");
const configP = require('config')
const cors = require('cors')
config()
db()
app.use(cors())
app.use(express.json())
app.use('/users',userRouter)
app.use('/rooms',rooms)


console.log(configP.get('db'))
//Run when the client connects

io.on("connection",(socket) => {
  socket.on("joinRoom", async({ username, room }) => {
    const user = await userJoin(socket.id, username, room);
    socket.join(user.room);

    //Welcome current user
    socket.emit("message", formatMessage(botName, "Welcome to ChatCord"));

console.log(user)

// Send users and room info`
io.to(user.room).emit('userInfo',{
    room:user.roomName,
    users: await getRoomUsers(room)
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

  socket.on("disconnect", async() => {
    const user = await userLeave(socket.id);
    console.log('User in serverjs',user);
    console.log('user room',user.roomName);
    if(user){
        io.to(user.room).emit("message", formatMessage(botName, `${user.username} has left the chat`));
        io.to(user.room).emit('userInfo',{
            room:user.room,
            users: await getRoomUsers(user.roomName)
        })
        
    }
  });





  //listen for chat messages


  socket.on("chatMessage", async(message) => {
    const user  = await getCurrentUser(socket.id)
    io.to(user.room).emit("message", formatMessage(user.username, message));
  });
});
app.use(express.static(path.join(__dirname, "public")));
app.get('/', (req, res) => {
  res.send('This is the homepage')
})
server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
