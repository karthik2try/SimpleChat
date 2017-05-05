'use strict';
const db = require('../db');
const dbUtil = require('../dbUtil');
module.exports = function(socket){
  socket.on('join',function(data){
    console.log('join - ',data);
    socket.join(data.roomName);
    db.roomDetailsModel.findOne({roomName:data.roomName},function(err,roomDetails){
      if(roomDetails.users.length === 1 && roomDetails.users[0] === ""){
        roomDetails.users.pop("");
      }
      roomDetails.users.push(data.userName);
      console.log('users - ',roomDetails.users);
      socket.emit('getUserList',roomDetails.users);
      socket.broadcast.emit('getUserList',data.userName);
      roomDetails.save();
    })
  })
}
