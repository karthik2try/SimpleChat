'use strict';
const db = require('../db');
const dbUtil = require('../dbUtil');
module.exports = function(socket){
  socket.on('createNewRoom',function(data){
    dbUtil.addRooms(data)
    .then(function(result){
      if(result === 'success'){
        data = [data];
        console.log(data);
        socket.broadcast.emit('roomDetails',data);
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  });
  socket.on('getRooms',function(){
    db.roomDetailsModel.find(function(err,data){
      if(!err){
        socket.emit('roomDetails',data);
      }else{
        socket.emit('roomDetails',null);
      }
    });
  });
}
