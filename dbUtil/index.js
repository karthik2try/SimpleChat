'use strict';
const db = require('../db');

function addRooms(data){

  return new Promise(function(resolve,reject){
    db.roomDetailsModel.findOne({roomName:data.chatRooms},function(err,result){
      console.log('r - ',err);
      if(result === null){
        var newRoom = db.roomDetailsModel({
          roomName:data.roomName,
          users:[data.users]
        });
        newRoom.save((err)=>{
          if(!err){
            resolve('success');
          }else{
            reject(null);
          }
        });
        console.log(newRoom);
        resolve('success');
      }else{
        reject(null);
      }
    });
  });
}

function addUser(userName){
  return new Promise(function(resolve,reject){
    db.userModel.findOne({userName:userName},function(err,data){
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
  addRooms
}
