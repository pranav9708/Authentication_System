const User = require('../models/User');
const crypto=require('crypto');
const forgotMailer=require('../mailers/forgotPassword_mailer');
module.exports.signupUser = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        if (password.length < 8) {
            req.flash('error', 'password must be atleast 8 characters long');
            return res.redirect('/signup');
        }

        const specialCharacters = /[`~!@#$%^&*()_+={}[\]:;'"<>?,.\\-]/;
        if (!specialCharacters.test(password)) {
            req.flash('error', 'Password must contain atleast one special character');
            return res.redirect('/signup');
        }

        if (password !== confirmPassword) {
            req.flash('error', 'passwords does not match');
            return res.redirect('/signup');

        }
        const user=await User.findOne({email:req.body.email});
        if(user){
            req.flash('error','email is already registered please sign In ')
            return res.redirect('/signin');
        }
        await User.create(req.body);
        req.flash('success','Login Successful');
        return res.render('home',{
            user:email.split('@')[0],
        })

    } catch (err) {
        return res.status(403).json(err);
    }

}

module.exports.renderSignIn = (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/home')
    }
    return res.render('signin');
}

module.exports.renderSignUP = (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/home')
    }
    return res.render('signUp');
}


module.exports.createSession=async(req,res)=>{
    req.flash('success','LogIn successful')
    return res.redirect('/home');
}

module.exports.deleteSession=async(req,res)=>{
    req.logout(function(err){
        if(err){
            return next(err);
        }
        req.flash('success','Logout Successful')
        return res.redirect('/signin');
    });
}

module.exports.home=async(req,res)=>{
    return res.render('home')
}

module.exports.forgotPassword=async(req,res)=>{
    try{
        const {email}=req.body;
        const user=await User.findOne({email:email});
        if(!user){
            req.flash('error','Entered email id is not registered');
            return res.redirect('/forgot-password');
        }

        const resetToken =crypto.randomBytes(20).toString('hex');
        const resetTokenExpires=Date.now()+3600000; //1 hour (60min * 60 seconds*1000milliseconds)


        const updatedUser=await User.findByIdAndUpdate(user._id,{
            resetPasswordToken: resetToken,
            resetPasswordExpires: resetTokenExpires,
        })
        
        const resetLink=`http://localhost:8004/reset-password/${resetToken}`;
        forgotMailer.forgotPassword(updatedUser,resetLink);
        req.flash('success','mail sent to reset-password');
        return res.redirect('/signin');

    }catch(err){
        res.status(500).json({error:"Internal server error"})
    }
}

module.exports.renderForgotPassword=async(req,res)=>{
    return res.render('forgotPassword');
}