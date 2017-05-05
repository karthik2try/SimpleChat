'use strict';

function socketHTTP(app){
  const http = require('http').Server(app);
  const io = require('socket.io')(http);
  io.of('/rooms').on('connection',function(socket){
    console.log('user connected');
    require('./roomsUtil')(socket);
  });
  io.of('/chat').on('connection',function(socket){
    console.log('user joined');
    require('./chatUtil')(socket);
  });
  return http;
}

module.exports = {
  socketHTTP
}
