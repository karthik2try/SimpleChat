'use strict';
const express = require('express');
const router = express.Router();
const dbUtil = require('../dbUtil');

router.get('/',function(req,res){
  res.render('login');
});

router.post('/login',function(req,res){
  if(req.body.userName != null || req.body.userName != "" ){
    dbUtil.addUser(req.body.userName)
      .then(function(result){
        if(result){
          res.render('chat-room');
        }else{
          res.render('login');
        }
      })
  }else{
      res.render('login');
  }
});

module.exports = router;
