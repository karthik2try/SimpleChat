'use strict';
const mongoose = require('mongoose');
mongoose.connect('mongodb://chatuser:chatpassword@ds129641.mlab.com:29641/simplechat',function(err){
  if(!err){
    console.log('connected to Mlab');
  }
});

const db = mongoose.connection;

var chatRoomSchema = new mongoose.Schema({
  chatRooms:String,
  NoOfUsers:Number
});

var chatRoomModel = mongoose.model('chatRoomModel',chatRoomSchema);

var userSchema = new mongoose.Schema({
  userName:String
});

var userModel = mongoose.model('userModel',userSchema);

var roomDetailsSchema = new mongoose.Schema({
  roomName:String,
  users:[String]
});

var roomDetailsModel = mongoose.model('roomDetailsModel',roomDetailsSchema);

module.exports = {
  chatRoomModel,
  roomDetailsModel,
  userModel
}
