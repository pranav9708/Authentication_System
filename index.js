const express=require('express');
const app =express();
const path = require('path');
const expressLayout = require('express-ejs-layouts')
const db=require('./config/db');
const dotenv=require('dotenv').config();
const flash=require('connect-flash');
const flashMiddleware=require('./config/flashMiddleware');
const cookieParser=require('cookie-parser');
const session=require('express-session');


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());

app.use(session({
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: false
}))
app.use(flash());
app.use(flashMiddleware.setFlash)

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