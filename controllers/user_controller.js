const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports.signinUser = async (req, res) => {
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email:email});
        const isMatching=await bcrypt.compare(password,user.password);

        if(isMatching){
            req.flash('success','Login Successful');
            return res.render('home',{
                user:email.split('@')[0]
            })
        }else{
            req.flash('error', 'Invalid password');
            return res.redirect('back');
        }
    }catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports.signupUser = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        console.log(email, password, confirmPassword);
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
    return res.render('signin');
}

module.exports.renderSignUP = (req, res) => {
    return res.render('signUp');
}