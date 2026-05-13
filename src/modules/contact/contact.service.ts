import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

const sendContactEmail = async (
  payload: any
) => {
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

  return await resend.emails.send({
    from:
      "YASPN Contact <onboarding@resend.dev>",

    to:
      process.env
        .CONTACT_RECEIVER_EMAIL || "",

    subject: `New Inquiry from ${firstName}`,

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