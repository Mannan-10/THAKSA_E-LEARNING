import { createMailer } from "../utils/sendMail.js";

const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const submittedAt = new Date().toISOString();

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "Name, email, subject, and message are required.",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email address." });
    }

    const receiverEmail = process.env.GMAIL;
    if (!receiverEmail) {
      return res.status(500).json({
        message: "Contact email receiver is not configured. Please set GMAIL in server environment.",
      });
    }

    const transport = createMailer();

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Feedback Submitted</h2>
        <p><strong>Submitted At (UTC):</strong> ${submittedAt}</p>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      </div>
    `;

    await transport.sendMail({
      from: process.env.GMAIL,
      to: receiverEmail,
      subject: `[Contact Feedback] ${subject}`,
      replyTo: email,
      html,
    });

    return res.status(200).json({ message: "Message sent successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Error submitting contact form: " + error.message });
  }
};

export { submitContactForm };
