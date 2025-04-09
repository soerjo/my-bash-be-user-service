import * as dotenv from 'dotenv';
import { createTransport } from 'nodemailer';
dotenv.config();

export const sendVerificationEmail = async (userEmail: string, token: string) => {
  const verificationUrl = `${process.env.FRONTENT_URL}/api/auth/verify-email?token=${token}`;

  const message = `
    <h1>Bank Sampah Email Verification</h1>
    <p>Click the link below to verify your email address:</p>
    <a href="${verificationUrl}">Verify Email</a>
  `;

  const transporter = createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: userEmail,
    subject: 'Bash App Email Verification',
    html: message,
  });

  console.log('Email sent!');
};

export const sendResetPasswordEmail = async (userEmail: string, token: string) => {
  const verificationUrl = `${process.env.FRONTENT_URL}/change-password?token=${token}`;

  const message = `
    <h1>Bank Sampah Email request rest Password</h1>
    <p>Click the link below to reset your password account:</p>
    <a href="${verificationUrl}">reset Password</a>
  `;

  const transporter = createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: userEmail,
    subject: 'Bash App Email Verification',
    html: message,
  });

  console.log('Email sent!');
};