//config file for setting up mailer
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

//transporter contains the email that will sent the mails.
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'abhijithv230@gmail.com',
        pass: 'fwykzussnhgnwlcs',
    },
});

//setting up the render file path for mail template file
let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function (err, template) {
            if (err) { console.log("error in rendering ejs template: " + err); return; }
            mailHTML = template
        }
    )

    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}
