import { createTransport } from "nodemailer";

const createMailer = () =>
  createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL,
      pass: process.env.PASSWORD,
    },
  });

const sendWelcomeMail = async (email, name) => {
  const transport = createMailer();

  const htmlContent = `
    <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #0f172a;">
      <h2 style="margin-bottom: 8px;">Welcome to Thaksa E-Learning</h2>
      <p>Hello ${name || "Learner"},</p>
      <p>Your account has been created successfully.</p>
      <p>We are excited to support your learning journey.</p>
      <p style="margin-top: 18px;">- Team Thaksa</p>
    </div>
  `;

  await transport.sendMail({
    from: process.env.GMAIL,
    to: email,
    subject: "Welcome to Thaksa E-Learning",
    html: htmlContent,
  });
};

const sendLoginAlertMail = async (email, name) => {
  const transport = createMailer();
  const loginTime = new Date().toISOString();

  const htmlContent = `
    <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #0f172a;">
      <h2 style="margin-bottom: 8px;">Login Alert - Thaksa E-Learning</h2>
      <p>Hello ${name || "Learner"},</p>
      <p>Your account was just logged in successfully.</p>
      <p><strong>Time (UTC):</strong> ${loginTime}</p>
      <p>If this was not you, please change your password immediately.</p>
      <p style="margin-top: 18px;">- Team Thaksa</p>
    </div>
  `;

  await transport.sendMail({
    from: process.env.GMAIL,
    to: email,
    subject: "New Login to Your Thaksa Account",
    html: htmlContent,
  });
};

export { sendWelcomeMail, sendLoginAlertMail };
