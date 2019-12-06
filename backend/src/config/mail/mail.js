const nodemailer = require('nodemailer');
const template = require('./templates');
const environment = require('../environment');

module.exports = {
  send(type, user) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: environment.FROM_EMAIL,
          pass: environment.FROM_PASSWORD
      },
      tls: { rejectUnauthorized: false }
    });

    const from = environment.FROM_EMAIL;
    const to = user.email;
    let subject = '';
    let html = '';
    
    if(type === 'welcome') {
      subject = "Bem vindo ao Teach.me!";
      html = template.welcome(user.name, user.email);
    }

    const mailOptions = { from, to, subject, html }
  
    transporter.sendMail(mailOptions, function(error, info) {
      if(error) {
        console.log(error);
      } else {
        console.log('Email has been sent successfully: ' + info.response);
      }
    });
  }
}