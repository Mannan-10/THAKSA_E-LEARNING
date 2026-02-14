import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/db.js";
import sendMail from "../utils/sendMail.js";
import { sendLoginAlertMail, sendWelcomeMail } from "../utils/sendAccountMail.js";

const safeSendAccountMail = async (mailAction, email, name, label) => {
  try {
    await mailAction(email, name);
  } catch (mailError) {
    console.error(`${label} failed:`, mailError.message);
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existingUser = await db.query(
      "SELECT * FROM users WHERE email = $1;",
      [email],
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const otp = Math.floor(100000 + Math.random() * 1000000);
    const hashedPassword = await bcrypt.hash(password, 10);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    await db.query(
      `INSERT INTO otp_verifications (email, username, otp, password, role, expires_at)
       VALUES ($1,$2,$3,$4,$5,$6)
       ON CONFLICT (email)
       DO UPDATE SET otp=$3, expires_at=$6`,
      [email, username, otp, hashedPassword, role || "student", expiresAt],
    );

    await sendMail(email, `Thaksa E-Learning - Verify your email`, { name: username, otp});
    res
      .status(200)
      .json({ message: "OTP sent to email for verification" });

    // await db.query(
    //     'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4);',[username, email, hashedPassword, role || 'student']
    // );

    // res.status(201).json({message: 'User registered successfully'});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user: " + error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await db.query("SELECT * FROM users WHERE email = $1;", [
      email,
    ]);
    const user = response.rows[0];
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Password is incorrect." });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    await safeSendAccountMail(sendLoginAlertMail, user.email, user.name, "Login alert mail");

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging in user: " + error.message });
  }
};

const verifyOtp = async (req, res) => {
  const client = await db.connect();

  try {
    const { email, otp } = req.body;

    const result = await client.query(
      "SELECT * FROM otp_verifications WHERE email = $1",
      [email]
    );

    const record = result.rows[0];

    if (!record || record.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (new Date() > record.expires_at) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    await client.query("BEGIN");

    const userResult = await client.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [record.username, email, record.password, record.role]
    );

    const userId = userResult.rows[0].id;

    await client.query(
      `INSERT INTO user_profiles (user_id) VALUES ($1)`,
      [userId]
    );

    await client.query(
      "DELETE FROM otp_verifications WHERE email = $1",
      [email]
    );

    await client.query("COMMIT");

    await safeSendAccountMail(sendWelcomeMail, email, record.username, "Welcome mail");

    return res.status(201).json({ message: "OTP verified successfully. User registered." });
  } catch (err) {
    try {
      await client.query("ROLLBACK");
    } catch {
      // no-op: rollback can fail if transaction did not begin
    }
    return res.status(500).json({ message: "Error verifying OTP: " + err.message });
  } finally {
    client.release();
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token missing" });
  }

  try {
    const payload = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );
    const dbToken = await db.query(
      "SELECT * FROM refresh_tokens WHERE token = $1",[refreshToken]
    );

    if (dbToken.rows.length === 0) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign(
      { userId: payload.userId, role: payload.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ message: "Token expired or invalid" });
  }
}

const logout = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token missing" });
  }

  await db.query(
    "DELETE FROM refresh_tokens WHERE token = $1",[refreshToken]
  );

  res.json({ message: "Logged out successfully" });
}

const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await db.query(
      "SELECT u.id, u.name, u.email, u.role, p.phone, p.bio, p.profile_image, p.date_of_birth FROM users u LEFT JOIN user_profiles p ON u.id = p.user_id WHERE u.id = $1;",[userId]
    );

    res.status(201).json({ profile: result.rows[0] });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving profile: " + error.message });
  }
};

const updateProfile = async (req, res) => {
  const userId = req.user.userId;
  const { name, phone, bio, date_of_birth } = req.body;

  await db.query(
    `UPDATE users SET name = $1 WHERE id = $2`,[name, userId]
  );

  await db.query(
    `UPDATE user_profiles SET phone = $1, bio = $2, date_of_birth = $3 WHERE user_id = $4`,[phone, bio, date_of_birth, userId]
  );

  res.status(200).json({ message: "Profile updated successfully" })
}

const changePassword = async (req, res) => {
  const userId = req.user.userId;
  const { currentPassword, newPassword } = req.body;

  const result = await db.query(
    "SELECT password FROM users WHERE id = $1",[userId]
  );

  const valid = await bcrypt.compare(
    currentPassword,
    result.rows[0].password
  );

  if (!valid ) {
    return res.status(400).json({ message: "Current password is incorrect" });
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  await db.query(
    "UPDATE users SET password = $1 WHERE id = $2",[hashed, userId]
  );

  await db.query(
    "DELETE FROM refresh_tokens WHERE user_id = $1",[userId]
  );

  res.status(200).json({ message: "Password changed successfully. Please log in again." });
}

const requestResetOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    await db.query(`
      CREATE TABLE IF NOT EXISTS password_reset_otps (
        email VARCHAR(255) PRIMARY KEY,
        otp VARCHAR(6) NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        verified BOOLEAN DEFAULT false
      );
    `);

    const userResult = await db.query(
      "SELECT id, name, email FROM users WHERE email = $1;",
      [email]
    );

    const user = userResult.rows[0];
    if (!user) {
      return res.status(404).json({ message: "No account found with this email" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await db.query(
      `INSERT INTO password_reset_otps (email, otp, expires_at, verified)
       VALUES ($1, $2, $3, false)
       ON CONFLICT (email)
       DO UPDATE SET otp = EXCLUDED.otp, expires_at = EXCLUDED.expires_at, verified = false`,
      [email, otp, expiresAt]
    );

    await sendMail(
      email,
      "Thaksa E-Learning - Reset Password OTP",
      { name: user.name, otp }
    );

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error sending reset OTP: " + error.message });
  }
};

const verifyResetOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const result = await db.query(
      "SELECT * FROM password_reset_otps WHERE email = $1",
      [email]
    );
    const record = result.rows[0];

    if (!record || record.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (new Date() > record.expires_at) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    await db.query(
      "UPDATE password_reset_otps SET verified = true WHERE email = $1",
      [email]
    );

    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error verifying reset OTP: " + error.message });
  }
};

const resetPasswordWithOtp = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: "Email and new password are required" });
    }

    const otpResult = await db.query(
      "SELECT * FROM password_reset_otps WHERE email = $1",
      [email]
    );
    const otpRecord = otpResult.rows[0];

    if (!otpRecord || !otpRecord.verified) {
      return res.status(400).json({ message: "OTP verification is required" });
    }

    if (new Date() > otpRecord.expires_at) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    const userResult = await db.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    const user = userResult.rows[0];
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await db.query(
      "UPDATE users SET password = $1 WHERE email = $2",
      [hashed, email]
    );

    await db.query(
      "DELETE FROM refresh_tokens WHERE user_id = $1",
      [user.id]
    );

    await db.query(
      "DELETE FROM password_reset_otps WHERE email = $1",
      [email]
    );

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error resetting password: " + error.message });
  }
};

export {
  register,
  login,
  getProfile,
  verifyOtp,
  refreshToken,
  updateProfile,
  changePassword,
  logout,
  requestResetOtp,
  verifyResetOtp,
  resetPasswordWithOtp,
};
