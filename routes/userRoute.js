const express=require('express');
const router=express.Router();
const userController=require('../controllers/user_controller');
const passport=require('passport');

router.get('/signin',userController.renderSignIn);

router.get('/',userController.renderSignIn);


router.get('/signup',userController.renderSignUP);

router.get('/home',passport.checkAuthentication,userController.home);

router.post('/create-session',passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.createSession);
  
router.post('/signup',userController.signupUser);

router.get('/logout-user',userController.deleteSession);

//url which sents request to google
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
//url in which we gets back data from google
router.get('/auth/google/callback',passport.authenticate('google',{ failureRedirect: '/signin', failureFlash: true }),userController.createSession)

router.get('/renderForgotPassword',userController.renderForgotPassword);
router.post('/forgot-password',userController.forgotPassword);

router.post('/reset-password/:token',userController.resetPassword);
router.get('/reset-password/:token',userController.renderResetPassword);
module.exports=router;