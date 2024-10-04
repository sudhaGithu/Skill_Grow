const nodemailer = require('nodemailer');
 
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'heshvithatech@gmail.com',
    pass: 'tqvt ycfu gsri lfhx',
  },
});
 
module.exports = transporter;