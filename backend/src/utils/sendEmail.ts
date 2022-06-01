/* eslint-disable prettier/prettier */
import * as nodemailer from 'nodemailer';

export const sendEmail = async (addressee: string, subject: string, text: string): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_USER, 
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.NODEMAILER_USER,
    to: addressee,
    subject,
    text
  });
};
