import nodemailer from 'nodemailer';
import { SMTP_PASSWORD,SMTP_EMAIL } from '../../config/env.js';
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: SMTP_EMAIL,
    pass: SMTP_PASSWORD,
  },
});

export function sendMail({ to, subject, text, html }) {

  try {
    const transport = transporter.sendMail({
      from: 'test.nninesolutions@gmail.com',
      to,
      subject,
      text,
      html,
    });

    return transport;
  } catch (error) {
    console.log('error', error);
  }
}
