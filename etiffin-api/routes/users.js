var express = require('express');
var router = express.Router();

const usermodel= require('../model/user.models');

/* GET users listing. */
router.post('/add', function(req, res, next) {
  
  var user = new usermodel({
   name:req.body.username,
   email:req.body.useremail,
   password:req.body.password,
   phone:req.body.phone});
   user.save(function(err, userObj){
     if(err){
       res.send({status:500, message: 'unable to add new user'});
     }
     else {
       res.send({status:200, message: 'user added successfully', menuDetails: userObj});
     }
   });
 });
 
 router.post('/login', function(req, res, next) {
  
    email=req.body.useremail,
    password=req.body.userpassword
   
   usermodel.find({'email':email},function(err, userObj){
     if(err){
       res.send({status:500, message: 'unable to add new user'});
     }
     else {
       if(password==userObj.password)
       res.send({status:200,message:'sucessfull login'})
     }
   });
 });



 module.exports = router;
