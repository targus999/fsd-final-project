var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var mongoose = require('mongoose'); 
const jwt=require('jsonwebtoken');


mongoose.connect('mongodb+srv://admin:12345@cluster1.zigmq.mongodb.net/menu?retryWrites=true&w=majority')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
username="admin"
password="1234"

const menuRouter=require('./routes/menu')
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/menu', menuRouter);


app.post('/admin',(req,res)=>{
  let userData=req.body
  if(username!=userData.username){
    res.status(401).send('invalid username');     
  }else
  if(password!=userData.password){
    res.status(401).send('invalid password'); 
  }else{
    let payload ={subject:username+password}
    let token = jwt.sign(payload,'secretkey')
    res.status(200).send({token});
  }
})



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
