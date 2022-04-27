const express = require("express");
const router = express.Router();
const config = require("config");
const _ = require("lodash");
const { validateUser, userSchema } = require("../models/userSchema");
const { Room } = require("../models/roomsSchema");

router.post("/register", async (req, res) => {
  const { error } = validateUser(req.body);
  console.log('request handled')
    if (error)
      return res.status(401).json({
        message: error.message,
        status: "failed",
      });
      if(error) console.log(error)
  const user = new userSchema(_.pick(req.body, ["username", "roomName"]));
  const room = new Room({
    roomName:user.roomName,
  });
  const findRoom = await Room.findOne({roomName:user.roomName})
  if(findRoom){
   findRoom.update({
     $push:{users:user._id}
   })
    }else{
    await room.save();
  }
  await user.save();
  res.status(200).json({
    status: "ok",
    message: "User saved ",
    data: user,
  });
});

module.exports = router;
