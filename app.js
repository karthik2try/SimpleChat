const express = require('express');
const app = express();
const sockHttp = require('./socket');
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false

   }));

app.use(express.static('public'));
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/',require('./router'));
sockHttp.socketHTTP(app).listen(3000,function(err){
  if(err){
    console.log(err);
  }else {
      console.log('app listening to port 3k');
    }
});
