//config file to setup passport google strategy
const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/User');


passport.use(new googleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: process.env.callbackURL,
},
async function(accessToken,refreshToken,profile,done){
    try{
        //checking if user is already present and creating a new user if not present
        const user=await User.findOne({email:profile.emails[0].value});
        if(user){
            return done(null,user);
        }else{
            const user=await User.create({
                email:profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            })
            return done(null,user);
        }
    }catch(err){
        console.log('error in google strategy signin',err);
        return;
    }
}))

