'use strict';
const db = require('../db');

function removeUser(){
  return new Promise(function(resolve,reject){
    db.userModel.remove({chat_id:chat_id},function(err){
      if(!err){
        resolve(true);
      }else{
        reject(false);
      }
    });
  })
}

function addRoomsID(userName,room_id){
  db.userModel.findOne({userName:userName},function(err,result){
    console.log('room result :', result);
    result.room_id = room_id;
    result.save();
  });
}

function addChatID(userName,chat_id,roomName){
  db.userModel.findOne({userName:userName},function(err,result){
    result.chat_id = chat_id;
    result.roomName = roomName;
    result.save();
  });
}

function findUserDetailsRI(idType,id){
  return new Promise(function(resolve,reject){
    db.userModel.findOne({room_id:id},function(err,user){
      if(!err){
        // console.log(user);
        resolve(user);
      }else{
        console.log(err);
        reject(null);
      }
    });
  });
}

function findUserDetailsCI(id){
  return new Promise(function(resolve,reject){
    db.userModel.findOne({chat_id:id},function(err,user){
      if(!err){
        // console.log(user);
        resolve(user);
      }else{
        console.log(err);
        reject(null);
      }
    });
  });
}

function removeUserByRoomID(room_id){
  return new Promise(function(resolve,reject){
  db.userModel.remove({room_id:room_id},function(err){
    if(!err){
      console.log(err," removed user");
      resolve(true);
    }else{
      reject(false);
    }
  });
});
}

function removeUserFromChatRoom(user){
  return new Promise(function(resolve,reject){
    db.roomDetailsModel.findOne({roomName:user.roomName},function(err,room){
      let i=0;
      if(room.users === null){

      }else{
        while(i < room.users.length){
          if(room.users[i] === user.userName){
            console.log(room.users[i] === user.userName);
            room.users.splice(i,1);
            room.save((err)=>{
              if(!err && room.users.length === 0){
                db.roomDetailsModel.remove({roomName:user.roomName},function(err){
                  if(!err){
                    resolve(room.users);
                  }
                });
              }else{
                resolve(room.users);
              }
            });
            break;
          }
          i++;
        }
      }
    });
  });
}

function removeUserByChatId(chat_id){
    db.userModel.remove({chat_id:chat_id},function(err){
      if(!err){
        console.log(" removed user");
      }
    });
}

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
  addRooms,
  addRoomsID,
  findUserDetailsRI,
  findUserDetailsCI,
  removeUserByRoomID,
  removeUserByChatId,
  removeUserFromChatRoom,
  addChatID
}
