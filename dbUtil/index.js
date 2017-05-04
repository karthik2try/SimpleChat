'use strict';
const db = require('../db');

function getAllRooms(){
  return new Promise(function(resolve,reject){
    db.chatRoomModel.find(function(err,data){
      if(data === null){
        resolve(null);
      }else{
        resolve(data);
      }
    });
  });
}

function addUser(userName){
  return new Promise(function(resolve,reject){
    db.userModel.findOne({userName:userName},function(err,data){
      console.log(err);
      if(err){
        reject(null);
      }
      if(data != null){
        resolve(false);
      }else{
        var newUser = db.userModel({userName:userName});
        newUser.save();
        resolve(true);
      }
    });
  });
}

module.exports = {
  addUser,
  getAllRooms
}
