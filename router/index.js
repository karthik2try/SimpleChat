'use strict';
const express = require('express');
const router = express.Router();
const dbUtil = require('../dbUtil');

router.get('/',function(req,res){
  res.render('login');
});

router.get('/logout/:userName',function(req,res){
  dbUtil.removeUser(req.params.userName)
    .then(function(result){
      if(result){
          res.render('login');
      }
    })
});

router.get('/leaveroom/:userName',function(req,res){
  res.render('chat-room',{userName:req.params.userName});
});

router.get('/room/:userName/:roomName',function(req,res){
  res.render('inside-room',{
    roomName:req.params.roomName,
    userName:req.params.userName
  });
});

router.get('/login/:userName',function(req,res){
  if(req.params.userName != null || req.params.userName != "" ){
    dbUtil.addUser(req.params.userName)
      .then(function(result){
        if(result){
          res.render('chat-room',{userName:req.params.userName});
        }else{
          res.render('login');
        }
      })
  }else{
      res.render('login');
  }
});


module.exports = router;
