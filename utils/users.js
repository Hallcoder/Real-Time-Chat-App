const mongoose = require("mongoose");
const _ = require("lodash");
const { userSchema } = require("../models/userSchema");
const { Room } = require("../models/roomsSchema");
//join user to chat

module.exports.userJoin = async (id, username, room) => {
  const user = await userSchema.findOneAndUpdate(
    { username },
    {
      socketId: id,
    }
  ).exec();
  const user1 = await user.save();
  const room1 = await Room.findOneAndUpdate(
    { roomName: room },
    {
      $push: { users: user },
    }
  ).exec();
  await room1.save();
  return user;
};
module.exports.userLeave = async (id) => {
  const user = await userSchema.findOne({ socketId: id }).exec(); // find returns an array  
  const room = await Room.findOne({ roomName: user.roomName}).exec();
  const userRemove = room.users.find((roomUser) => user._id === Object.entries(roomUser).map(user => user._id));
  // delete user.socketId;
  // await user.save();
  const removed = room.users.splice(room.users.indexOf(userRemove),1);
  await room.save();
  return removed;
};

module.exports.getRoomUsers = async(room) => {
    const room1 = await  Room.findOne({roomName:room}).exec();
    console.log('room1',room1);
    return room1.users;
}

//Get the current users
module.exports.getCurrentUser = async(id) => {
  const user = await userSchema.findOne({socketId:id}).exec();
  return user;
};
