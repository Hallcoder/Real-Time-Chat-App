const Joi = require('joi');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const config = require('config');


const userSchema =  new mongoose.Schema({
    username:{
        type:String,
        minlength:1,
        maxlength:255,
        required:true
    },
    roomName:{
        type:String,
        required:true,
    },
    socketId:String
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'))
    return token;
}
function validateUser(user){
    const schema = Joi.object({
        username:Joi.string().required().min(1).max(255),
        roomName:Joi.string().min(5).max(255).required(),
    })
    return schema.validate(user)
}
exports.userSchema = mongoose.model('users',userSchema);
exports.validateUser = validateUser;