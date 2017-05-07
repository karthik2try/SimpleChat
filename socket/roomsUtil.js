'use strict';
const db = require('../db');
const dbUtil = require('../dbUtil');
module.exports = function(socket){
  socket.on('registerSocketID',function(userName){
    console.log(userName,'room_id : ',socket.id);
    dbUtil.addRoomsID(userName,socket.id);
  });
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

  // socket.on('disconnect',function(){
  //   dbUtil.findUserDetailsRI(socket.id)
  //     .then(function(user){
  //       console.log(user);
  //       dbUtil.removeUserByRoomID(socket.id)
  //         .then(function(result){
  //           if(result){
  //             // console.log(user.userName," removed");
  //           }
  //         })
  //         .catch(function(err){
  //           console.log(err);
  //         })
  //     })
  //     .catch(function(err){
  //       console.log(err);
  //     })
  // });
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
