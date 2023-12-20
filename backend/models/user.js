var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var userschema = new mongoose.Schema
({
    id:
    {
        type:String,
        required:true
    },
    password:
    {
        type:String,
        required:true
    }   
})
const AdminUser = mongoose.model("adminusers",userschema);
module.exports = AdminUser;