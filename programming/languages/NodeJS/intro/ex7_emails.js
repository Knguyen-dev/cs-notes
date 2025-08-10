/*
+ Nodemailer: A popular and simple module that makes it easy to send
 emails with a server. First do 'npm install nodemailer'. It's a good 
 choice that allows NodeJS apps to send emails to users.  

+ How to use:
1. Create a transporter. Here we define the email service we want
  to use and put in your authentication credentials. Email services
  need to verify that you're an authorized user that can send an email.
  This prevents misuse such as bots, spam, and abuse. In a company,
  a dedicated company email and password would be inserted (newsletter@gmail.com).


2. Create an object with the email information

+ Security best practices:
- Rather than hard coding the user and password, access them with environment variables.
  As a result this prevents your credentials from being leaked via version control
  or to other other people.
*/

const nodemailer = require("nodemailer");

const gmailTransporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "your-email@gmail.com", // authenticated sender's email
		// user: process.env.email

		pass: "yourPassword",
		// pass: process.env.password
	},
});

const gmailOptions = {
	from: "your-email@gmail.com", // most of the time match the authenicated sender's email.
	to: "recipient-email@example.com",

	// You can send the email to more than one address.
	// to: "person1@yahoo.com, person2@gmail.cmo"

	subject: "Subject of the Email",
	text: "Text content of the email",
};

gmailTransporter.sendMail(gmailOption, (error, info) => {
	if (error) {
		console.error("Gmail Transporter Error: ", error);
	} else {
		console.log("Email sent: " + info.response);
	}
});
