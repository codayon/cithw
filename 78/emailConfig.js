import "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendWelcomeEmail = async (toEmail, username) => {
  const mailOptions = {
    from: `"My App Team" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Welcome to Our Platform!",
    html: `
      <h1>Welcome, ${username}!</h1>
      <p>We are glad to have you here.</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
