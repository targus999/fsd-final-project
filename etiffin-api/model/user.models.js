const mongoose= require('mongoose');
var schema = mongoose.Schema;

const userschema = new schema({
    name:String,
    email:String,
    password:String,
    phone:String
});

var usermodel = mongoose.model('user',userschema);
module.exports = usermodel;