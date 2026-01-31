import express from 'express';
import pool from "./db.js";

const app = express();
const PORT = process.env.PORT || 3000;


pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("❌ DB connection failed:", err);
  } else {
    console.log("✅ Database connected at:", res.rows[0].now);
  }
});

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/test', async (req, res) => {
    const result = await pool.query("SELECT * FROM courses;");
    res.json({ message: "Query successfully runs", rows: result.rows });
    console.log(result.rows);
})

app.listen(PORT ,() => {
    console.log(`Server is running on http://localhost:${PORT}`);
})