const mongoose = require('mongoose');
const bcrypt= require('bcrypt');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    googleId:{
        type:String,
    },
    resetPasswordToken:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date
    }
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) { // Only hash if modified or new
        try {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        } catch (error) {
            return next(error);
        }
    }
    next();
});

const User=mongoose.model('User',userSchema)

module.exports=User;