const express=require('express');
const router=express.Router();
const userController=require('../controllers/user_controller');

router.get('/signin',userController.renderSignIn);

router.get('/signup',userController.renderSignUP);

router.post('/signin',userController.signinUser);

router.post('/signup',userController.signupUser);


module.exports=router;