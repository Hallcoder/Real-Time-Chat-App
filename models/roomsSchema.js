const mongoose = require('mongoose')


const roomSchema = new mongoose.Schema({
    roomName:{
        type: String,
        unique: true,
        required: true,
        users:Array,
    },
    users:Array,
})

module.exports.Room = mongoose.model('rooms',roomSchema);