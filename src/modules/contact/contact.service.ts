import nodemailer from "nodemailer";
import { env } from "../../config/env";

const transporter = nodemailer.createTransport({
  host: env.smtp_host,
  port: Number(env.smtp_port),
  secure: true,
  auth: {
    user: env.smtp_user,
    pass: env.smtp_pass,
  },
});

const sendContactEmail = async (payload: any) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    company,
    service,
    location,
    message,
  } = payload;

  return await transporter.sendMail({
    from: `"YASPN Contact" <${env.email_from}>`,

    to: env.contact_receiver_email,

    replyTo: email,

    subject: `New Inquiry from ${firstName} ${lastName}`,

    html: `
      <h2>New Contact Inquiry</h2>

      <p><strong>Name:</strong> ${firstName} ${lastName}</p>

      <p><strong>Email:</strong> ${email}</p>

      <p><strong>Phone:</strong> ${phone}</p>

      <p><strong>Company:</strong> ${company}</p>

      <p><strong>Service:</strong> ${service}</p>

      <p><strong>Location:</strong> ${location}</p>

      <p><strong>Message:</strong></p>

      <p>${message}</p>
    `,
  });
};

export const ContactService = {
  sendContactEmail,
};