'use strict';
const app = require('express')();
const sockHttp = require('./socket');

app.use('/',require('./router'));

sockHttp.socketHTTP(app).listen(3000,function(err){
  if(err){
    console.log(err);
  }else {
      console.log('app listening to port 3k');
    }
});
