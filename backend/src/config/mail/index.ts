import nodemailer from 'nodemailer';
import environment from '../environment';
import * as template from './templates';

interface User {
  email: string;
  name: string;
}

const send = (type: string, user: User): void => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: environment.FROM_EMAIL,
      pass: environment.FROM_PASSWORD,
    },
    tls: { rejectUnauthorized: false },
  });

  const from = environment.FROM_EMAIL;
  const to = user.email;
  let subject = '';
  let html = '';

  if (type === 'welcome') {
    subject = 'Bem vindo ao Teach.me!';
    html = template.welcome(user.name, user.email);
  }

  const mailOptions = {
    from, to, subject, html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email has been sent successfully: ${info.response}`);
    }
  });
};

export default send;
