const nodemailer = require("nodemailer");

export const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_AUTH_USER,
    pass: process.env.NODEMAILER_AUTH_PASS,
  },
	tls: {
		// do not fail on invalid certs
		rejectUnauthorized: false
},
});