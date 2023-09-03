module.exports.signinUser=(req,res)=>{
    

    return res.status(200).json(req.body);
}

module.exports.signupUser=(req,res)=>{
    const {email,password,confirmPassword}=req.body;
    console.log(email,password,confirmPassword);
    if(password.length<8){
        req.flash('error','password must be atleast 8 characters long');
        return res.redirect('/signup');
    }

    const specialCharacters=/[`~!@#$%^&*()_+={}[\]:;'"<>?,.\\-]/;
    if(!specialCharacters.test(password)){
        req.flash('error','Password must contain atleast one special character');
        return res.redirect('/signup');
    }

    if(password!==confirmPassword){
        req.flash('error','passwords does not match');
        return res.redirect('/signup');

    }

    return res.status(200).json(req.body);
}

module.exports.renderSignIn=(req,res)=>{
    return res.render('signin');
}

module.exports.renderSignUP=(req,res)=>{
    return res.render('signUp');
}