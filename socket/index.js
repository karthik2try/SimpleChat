'use strict';

function socketHTTP(app){
  const http = require('http').Server(app);
  const io = require('socket.io')(http);
  io.of('/chat').on('connection',function(socket){
    require('./socketUtil')(socket);
  });
  return http;
}

module.exports = {
  socketHTTP
}
