const express=require('express');
const router=express.Router();
const userController=require('../controllers/user_controller');
const passport=require('passport');

router.get('/signin',userController.renderSignIn);

router.get('/signup',userController.renderSignUP);

router.get('/home',passport.checkAuthentication,userController.home);

router.post('/create-session',passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.createSession);
  
router.post('/signup',userController.signupUser);

router.get('/logout-user',userController.deleteSession);

module.exports=router;