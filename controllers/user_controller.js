//controller file for user route.
const User = require('../models/User');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const forgotMailer = require('../mailers/forgotPassword_mailer');

//controller function to show signin form
module.exports.renderSignIn = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/user/home')
    }
    return res.render('signin');
}

//controller function to show signup form
module.exports.renderSignUP = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/user/home')
    }
    return res.render('signup');
}

//controller function to create a new user using signup form.
module.exports.signupUser = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        //some checks to ensure secure password
        if (password.length < 6) {
            req.flash('error', 'password must be atleast 6 characters long');
            return res.redirect('/user/signup');
        }

        const specialCharacters = /[`~!@#$%^&*()_+={}[\]:;'"<>?,.\\-]/;
        if (!specialCharacters.test(password)) {
            req.flash('error', 'Password must contain atleast one special character');
            return res.redirect('/user/signup');
        }

        //checking if passwords are matching.
        if (password !== confirmPassword) {
            req.flash('error', 'passwords does not match');
            return res.redirect('/user/signup');

        }
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            req.flash('error', 'email is already registered please sign In ')
            return res.redirect('/user/signin');
        }
        await User.create(req.body);
        req.flash('success', 'Login Successful');
        return res.render('home')

    } catch (err) {
        return res.status(403).json(err);
    }

}

//controller function to create a session
module.exports.createSession = async (req, res) => {
    req.flash('success', 'LogIn successful')
    return res.redirect('/user/home');
}

//controller function to delete a session
module.exports.deleteSession = async (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Logout Successful')
        return res.redirect('/user/signin');
    });
}

//controller function to show home
module.exports.home = async (req, res) => {
    return res.render('home')
}

//controller function to send mail for forgot password for existing users
module.exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            req.flash('error', 'Entered email id is not registered');
            return res.redirect('/user/forgot-password');
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpires = Date.now() + 3600000; //1 hour (60min * 60 seconds*1000milliseconds)


        const updatedUser = await User.findByIdAndUpdate(user._id, {
            resetPasswordToken: resetToken,
            resetPasswordExpires: resetTokenExpires,
        })

        const resetLink = `http://localhost:8004/user/reset-password/${resetToken}`;
        forgotMailer.forgotPassword(updatedUser, resetLink);
        req.flash('success', 'mail sent to reset-password');
        return res.redirect('/user/forgot-password/sent');

    } catch (err) {
        res.status(500).json({ error: "Internal server error" })
    }
}

//controller function to render forgot password
module.exports.renderForgotPassword = async (req, res) => {
    return res.render('forgotPassword');
}

//controller function to reset password
module.exports.resetPassword = async (req, res) => {
    try {
        const token = req.params.token;
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });
        if (!user) {
            return res.redirect('/user/forgot-password/expired');
        }
        const newPassword = req.body.password;

        //some checks to ensure secure password
        if (newPassword.length < 6) {
            req.flash('error', 'password must be atleast 6 characters long');
            return res.redirect('back');
        }

        const specialCharacters = /[`~!@#$%^&*()_+={}[\]:;'"<>?,.\\-]/;
        if (!specialCharacters.test(newPassword)) {
            req.flash('error', 'Password must contain atleast one special character');
            return res.redirect('back');
        }

        bcrypt.hash(newPassword, 10, async (err, hashedPassword) => {
            if (err) {
                console.error('Error hashing password', err);
            } else {
                console.log(hashedPassword);
                const updatedUser = await User.findByIdAndUpdate(user._id, {
                    password: hashedPassword,
                    resetPasswordToken: null,
                    resetPasswordExpires: null,
                },{ new: true })
                console.log(newPassword);
                console.log(updatedUser);
            }
        })


        return res.redirect('/user/signin');
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

//controller function to show reset password form
module.exports.renderResetPassword = async (req, res) => {
    try {
        const token = req.params.token;
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });
        if (!user) {
            return res.redirect('/user/forgot-password/expired');
        }
        return res.render('resetPassword', { token })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" })
    }
}