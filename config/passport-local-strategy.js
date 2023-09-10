const passport = require('passport');
const LocalStrategy= require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User=require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,

}, async function(req,email,password,done){

    try{
        const user = await User.findOne({ email: email});
        if(!user){
            req.flash('error','Invalid email or password');
            return done(null,false);
        }
        const isMatching=await bcrypt.compare(password,user.password);
        if(!isMatching){
            console.log('error in finding user ----->Passport local');
            req.flash('error','Invalid email or password');
            return done(null,false);
        }
        return done(null,user);
    }catch(err){
        req.flash('error',err);
        return done(err);
    }
}))


passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser(async (id,done)=>{
    try{
        const user=await User.findById(id);
        if(user){
            return done(null,user);
        }
    }catch(err){
        console.log(err);
        return done(err);
    }
})

passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/signin');
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    return next();
}

module.exports=passport;