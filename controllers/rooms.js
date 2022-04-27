const express = require('express');
const { Room } = require('../models/roomsSchema');
const router = express.Router();

router.post('/',async(req,res) => {
    const room = new Room({roomName:req.body.roomName});
    await room.save();
    res.send('Room saved successfully')
})
module.exports = router