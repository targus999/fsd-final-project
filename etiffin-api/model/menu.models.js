const mongoose= require('mongoose');
var schema = mongoose.Schema;

const menuschema = new schema({
    title:String,
    type:String,
    Desc:String,
    image:String
});

var menumodel = mongoose.model('menu',menuschema);
module.exports = menumodel;