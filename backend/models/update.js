const mongoose = require('mongoose');

const updateschema = new mongoose.Schema
({
    authorid:
    {
        type:String,
        required:true,
    },
    eventname:
    {
        type:String,
        //take suggestion from the chatgpt and keep the array of titles
    },
    typeofevent:
    {
        type:String,
        required:true,
    },
    link:
    {   
        type:String,
        required:true,
    },
    date:
    {
        type:Date,
        default:Date.now
    }
}) 
const updates = mongoose.model("updates",updateschema);
module.exports = updates;