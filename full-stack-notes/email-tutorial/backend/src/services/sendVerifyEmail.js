const { transporter } = require("./sendEmail");
const ejs = require('ejs');
const fs = require('fs');

const sendVerifyEmail = (email, name, verificationURL) => {
    fs.readFile("./src/views/VerifyEmail.ejs", 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading template file:', err);
            return;
        }

        // Render the EJS template with the verification code
        let htmlContent = ejs.render(data, { name: name, verificationURL: verificationURL });


        // Set email configurations
        let mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: 'Email Verification',
            html: htmlContent
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error occurred:', error.message);
                return;
            }
            console.log('Email sent:', info.messageId);
        });
    });
}
module.exports = sendVerifyEmail;