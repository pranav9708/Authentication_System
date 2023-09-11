//forgot mail setup file.
const nodeMailer=require('../config/nodeMailer');
const dotenv=require('dotenv').config();

exports.forgotPassword=(user,resetLink)=>{
    //getting html content from ejs file
    let htmlString=nodeMailer.renderTemplate({user:user,resetLink:resetLink},'/forgotmail.ejs');

    nodeMailer.transporter.sendMail({
        from: process.env.nodemailerEmail,
        to: user.email,
        subject:'Link to reset password',
        html:htmlString,
    },(err,info)=>{
        if(err){
            console.log("Error in sending email: " + err);
        }
    })
}