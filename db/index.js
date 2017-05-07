'use strict';
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://chatuser:chatpassword@ds129641.mlab.com:29641/simplechat',function(err){
  if(!err){
    console.log('connected to Mlab');
  }
});

const db = mongoose.connection;

var userSchema = new mongoose.Schema({
  userName:String,
  roomName:String,
  room_id:String,
  chat_id:String
});

var userModel = mongoose.model('userModel',userSchema);

var roomDetailsSchema = new mongoose.Schema({
  roomName:String,
  users:[String]
});

var roomDetailsModel = mongoose.model('roomDetailsModel',roomDetailsSchema);

module.exports = {
  roomDetailsModel,
  userModel
}
