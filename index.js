const express=require('express');
const app =express();
const path = require('path');
const expressLayout = require('express-ejs-layouts')
const dotenv=require('dotenv').config();
// const db=require('./config/db');


const port=process.env.PORT || 8001;
app.use(expressLayout);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.static('./assets'));
app.use('/',require('./routes'));

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})