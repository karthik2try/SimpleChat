'use strict';
const db = require('../db');
const dbUtil = require('../dbUtil');
module.exports = function(socket){

  socket.on('join',function(data){
    socket.join(data.roomName);
    dbUtil.addChatID(data.userName,socket.id,data.roomName);
    db.roomDetailsModel.findOne({roomName:data.roomName},function(err,roomDetails){
      console.log('rd : ',roomDetails);
      if(roomDetails.users != null || roomDetails.users != undefined){
        if(roomDetails.users.length === 1 && roomDetails.users[0] === ""){
          roomDetails.users.pop("");
        }
      }
      roomDetails.users.push(data.userName);
      socket.emit('getUserList',roomDetails.users);
      socket.broadcast.to(data.roomName).emit('getUserList',roomDetails.users);
      roomDetails.save();
    })
  });

  socket.on('disconnect',function(){
    dbUtil.findUserDetailsCI(socket.id)
      .then(function(user){
        // dbUtil.removeUserByChatId(socket.id);
        console.log(user);
        dbUtil.removeUserFromChatRoom(user)
          .then(function(updatedUserList){
            if(updatedUserList.length > 0){
              console.log('users : ',updatedUserList);
                socket.broadcast.to(user.roomName).emit('getUserList',updatedUserList);
            }
          })
          .catch(function(err){
            console.log(err);
          })
      })
      .catch(function(err){
        console.log(err);
      })
  });

  socket.on('sendMsg',function(msgData){
    console.log(socket.id);
    socket.broadcast.to(msgData.roomName).emit('receiveMsg',msgData);
  });


}
