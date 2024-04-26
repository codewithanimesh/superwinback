import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.example.com', // Your SMTP host
  port: 587, // Your SMTP port
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'your_email@example.com', // Your email address
    pass: 'your_password', // Your email password
  },
});

export default transporter;
