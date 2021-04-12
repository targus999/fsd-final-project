var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

const menumodel= require('../model/menu.models');

/* GET BREAKFAST menu listing. */
router.get('/breakfast', function(req, res, next) {
   
   menumodel.find({type:'breakfast'}, function(err, response){
    if(err){
      res.send({status:500, message: 'unable find menu'});
    }
    else {
      res.send({status:200, message: 'found!', results: response});
    } 
   })
});
 

/* GET LUNCH menu listing. */
router.get('/lunch', function(req, res, next) {
   
  menumodel.find({type:'lunch'}, function(err, response){
   if(err){
     res.send({status:500, message: 'unable find menu'});
   }
   else {
     res.send({status:200, message: 'found!', results: response});
   } 
  })
});


/* GET DINNER menu listing. */
router.get('/dinner', function(req, res, next) {
   
  menumodel.find({type:'dinner'}, function(err, response){
   if(err){
     res.send({status:500, message: 'unable find menu'});
   }
   else {
     res.send({status:200, message: 'found!', results: response});
   } 
  })
});




/* ADD to menu. */
router.post('/add', function(req, res) {

  var men = new menumodel({
    title:req.body.title,
    type:req.body.type,
    Desc:req.body.Desc,
    image:req.body.image
  });
  men.save(function(err, menuObj){
    if(err){
      res.send({status:500, message: 'unable to add to menu'});
    }
    else {
      res.send({status:200, message: 'menu added succefully', menuDetails: menuObj});
    }
  });
  
});






/* UPDATE menu listing. */
router.post('/update', function(req, res) {                            

  const Id= req.body._id;

  let menuObj={
    title:req.body.title,
    type:req.body.type,
    Desc:req.body.Desc,
    image:req.body.image
  }


  menumodel.findByIdAndUpdate({"_id":Id}, menuObj, function(err, response){                    
    if(err){
      res.send({status:500, message: 'unable to update menu'});
    }
    else {
      res.send({status:200, message: 'update succefully', results: response});
    }
  });
});
    
router.get('/update/:id', function(req, res) {                            

  const Id= req.params.id;


  menumodel.findOne({"_id":Id},function(err, response){                    
    if(err){
      res.send({status:500, message: 'unable to update menu'});
    }
    else {
      res.send({status:200, message: 'update succefully', results: response});
    }
  });
});
                     







/* DELETE menu listing. */
router.delete('/remove/:id',(req,res)=>{
   
  id = req.params.id;
  menumodel.findByIdAndDelete({"_id":id})
  .then(()=>{
      console.log('success')
      res.send();
  })
})

module.exports = router;
