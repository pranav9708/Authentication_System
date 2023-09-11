const express=require('express');
const router=express.Router();
const userController=require('../controllers/user_controller');
const passport=require('passport');

router.get('/signin',userController.renderSignIn);
router.get('/signup',userController.renderSignUP);

//checking if user is authenticated before showing home page
router.get('/home',passport.checkAuthentication,userController.home);

//route to create session to store user information
router.post('/create-session',passport.authenticate('local', { failureRedirect: '/user/signin', failureFlash: true }), userController.createSession);
  
router.post('/signup',userController.signupUser);
router.get('/logout-user',userController.deleteSession);

//url which sents request to google
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
//url in which we gets back data from google
router.get('/auth/google/callback',passport.authenticate('google',{ failureRedirect: '/user/signin', failureFlash: true }),userController.createSession)

router.get('/renderForgotPassword',userController.renderForgotPassword);
//route to send reset link to mail
router.post('/forgot-password',userController.forgotPassword);

router.post('/reset-password/:token',userController.resetPassword);
router.get('/reset-password/:token',userController.renderResetPassword);

router.get('/forgot-password/sent',(req,res)=>{
    return res.send('<h1 class="heading">Please check your inbox for reset link</h1>')
})

router.get('/forgot-password/expired',(req,res)=>{
    return res.send('<h1 class="heading">Invalid reset link</h1>')
})

module.exports=router;