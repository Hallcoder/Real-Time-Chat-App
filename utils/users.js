const users = [];

//join user to chat

module.exports.userJoin = (id,username,room) => {
    const user = {id,username,room}
    users.push(user)
    return user
}
module.exports.userLeave = (id) => {
    const index = users.findIndex(user => user.id === id);
    if(index !== -1 ){
     return users.splice(index , 1)[0]
    }
}

module.exports.getRoomUsers = (room) => {
    return users.filter(user => user.room === room)
}


//Get the current users
module.exports.getCurrentUser = (id) => {
    return users.find(user => user.id === id)
}