import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/db.js";
import sendMail from "../utils/sendMail.js";

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
      .json({ message: "OTP sent to email for verification", otp });

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
    try {
        const { email, otp } = req.body;

        const result = await db.query(
            'SELECT * FROM otp_verifications WHERE email = $1',[email]
        );

        const record = result.rows[0];

        if (!record || record.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (new Date() > record.expires_at) {
            return res.status(400).json({ message: "OTP has expired" });
        }

        await db.query(
            `INSERT INTO users (name, email, password, role)
            VALUES ($1, $2, $3, $4)`,
            [record.username, email, record.password, record.role]
        )

        await db.query(
            'DELETE FROM otp_verifications WHERE email = $1',[email]
        )
        res.status(201).json({ message: "OTP verified successfully. User registered." });
    } catch (err) {
        res.status(500).json({ message: "Error verifying OTP: " + err.message });
    }
}

const getProfile = async (req, res) => {
  try {
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving profile: " + error.message });
  }
};

export { register, login, getProfile, verifyOtp };
