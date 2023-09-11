//configuration file for database

const mongoose=require('mongoose');
const dotenv=require('dotenv').config();
const mongoURL=process.env.mongoURL;

mongoose.connect(mongoURL,{
    useUnifiedTopology:true
});

const db=mongoose.connection;
db.on('error',
console.error.bind(console,'Error while connecting to MongoDB'));
db.once('open',()=>{
    console.log('Connected to MongoDB');
})

module.exports=db;