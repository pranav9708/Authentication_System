const mongoose=require('mongoose');
const mongoURL=process.env.MONGODB_URL;

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