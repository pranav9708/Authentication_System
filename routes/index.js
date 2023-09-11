const express=require('express');
const router=express.Router();

//rendering signin as default page
router.get('/',(req,res)=>{
    return res.redirect('/user/signin');
});

//sending all user route request to userRoute
router.use('/user',require('./userRoute'));

module.exports=router;