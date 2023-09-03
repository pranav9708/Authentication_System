const express=require('express');
const app =express();
const dotenv=require('dotenv').config();
// const db=require('./config/db');


const port=process.env.PORT || 8001;

app.set('view engine', 'ejs');
app.set('views','./views');

app.use('/',require('./routes'));

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})