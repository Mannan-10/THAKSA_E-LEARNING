import { createTransport } from "nodemailer";

const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "Name, email, subject, and message are required.",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email address." });
    }

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || process.env.GMAIL;
    if (!receiverEmail) {
      return res.status(500).json({ message: "Contact email receiver is not configured." });
    }

    const transport = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${String(message).replace(/\n/g, "<br/>")}</p>
      </div>
    `;

    await transport.sendMail({
      from: process.env.GMAIL,
      to: receiverEmail,
      subject: `[Contact] ${subject}`,
      replyTo: email,
      html,
    });

    return res.status(200).json({ message: "Message sent successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Error submitting contact form: " + error.message });
  }
};

export { submitContactForm };
