import { createTransport } from "nodemailer";

const sendMail = async (email, subject, data) => {
  try {
    const transport = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            padding: 0;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            text-align: center;
            border: 2px solid #f0f0f0;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            width: 50vw;
        }
        h1 {
            color: red;
        }
        p {
            margin-bottom: 20px;
            color: #666;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            margin-bottom: 20px;
            border: 1px dashed #ccc;
            border-radius: 4px;
            padding: 10px;
            display: inline-block;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>OTP Verification</h1>
        <p>Hello ${data.name}, your (One-Time Password) for your account verification is.</p>
        <p class="otp">${data.otp}</p>
    </div>
</body>
</html>`;
    await transport.sendMail({
      from: process.env.GMAIL,
      to: email,
      subject: subject,
      html: htmlContent,
    });
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

export default sendMail;
