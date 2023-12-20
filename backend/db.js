const mongoose = require('mongoose');
const url  = 'mongodb://127.0.0.1:27017/Vconnect';
const connectToMongo = async()=>
{
    await mongoose.connect(url);
    {
        console.log('connected to database');
    }
}
connectToMongo();