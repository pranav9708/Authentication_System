const express=require('express');
const app =express();
const path = require('path');
const expressLayout = require('express-ejs-layouts')
const db=require('./config/db');
const dotenv=require('dotenv').config();
const flash=require('connect-flash');
const flashMiddleware=require('./config/flashMiddleware');
const session=require('express-session');
const bodyParser=require('body-parser');
const MongoStore=require('connect-mongo');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy')

app.use(bodyParser.urlencoded({extended:false}));

const port=process.env.PORT || 8001;

app.use(session({
    name:'authSystem',
    secret: process.env.sessionSecret,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore({
        mongoUrl: process.env.mongoURL,
        collectionName: 'sessions'
    })
}))

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flashMiddleware.setFlash);

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