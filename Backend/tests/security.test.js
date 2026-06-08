/**
 * SkillForge — Security Integration Tests
 *
 * All test data (users, course, module, lesson, batch, enrollment, payment)
 * is created from scratch in beforeAll using a dedicated DB pool.
 * JWT tokens are minted directly via jwt.sign — no SMTP needed.
 * All test data is deleted in afterAll in FK-safe order.
 * Both DB pools are closed cleanly so Jest exits without open-handle warnings.
 *
 * Covers:
 *  Fix 1 — Registration always stores role='student' in otp_verifications
 *  Fix 2 — Course content: 401 unauthenticated, 403 unenrolled, 200 enrolled
 *  Fix 3 — Lesson complete: 403 unenrolled, 200 enrolled
 *  Fix 4 — Enrollment: 403 without completed payment
 */

import request    from "supertest";
import express    from "express";
import dotenv     from "dotenv";
import bcrypt     from "bcrypt";
import jwt        from "jsonwebtoken";
import pkg        from "pg";
import bodyParser from "body-parser";
import cors       from "cors";

dotenv.config();

// ─── Dedicated pool used ONLY for test setup / teardown ──────────────────────
// Kept separate from the app pool so we can close it independently.
const { Pool } = pkg;
const testPool = new Pool({
  user:     process.env.DB_USER,
  host:     process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port:     process.env.DB_PORT,
});

// ─── Import the app's own pool so we can close it in afterAll ────────────────
import db from "../src/config/db.js";

// ─── Build the Express app (mirrors index.js, no app.listen) ─────────────────
import userRouter          from "../src/routes/users.js";
import courseContentRouter from "../src/routes/courseContentRoutes.js";
import enrollmentRouter    from "../src/routes/enrollmentRoutes.js";
import paymentRouter       from "../src/routes/paymentRoutes.js";

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/users",   userRouter);
app.use("/api/courses", courseContentRouter);
app.use("/api",         enrollmentRouter);
app.use("/api",         paymentRouter);

// ─── Test data ────────────────────────────────────────────────────────────────
// Unique email addresses that are unlikely to clash with real data
const EMAILS = {
  instructor:     "jest-sec-instr@skillforge.test",
  unenrolled:     "jest-sec-unenr@skillforge.test",
  enrolled:       "jest-sec-enr@skillforge.test",
  roleEscalation: "jest-sec-rolehack@skillforge.test",
};
const TEST_PASSWORD = "JestSecurity123!";

// Minted once in beforeAll, used across all suites
const ids    = {};   // { instructor, course, module, lesson, batch, unenrolled, enrolled }
const tokens = {};   // { unenrolled, enrolled }

// Helper: mint a JWT the same way the login controller does
const makeToken = (userId, role) =>
  jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: "1h" });

// ═══════════════════════════════════════════════════════════════════════════════
// SETUP
// ═══════════════════════════════════════════════════════════════════════════════
beforeAll(async () => {
  const allEmails = Object.values(EMAILS);
  const hashed    = await bcrypt.hash(TEST_PASSWORD, 10);

  // 1. Wipe any leftovers from a previous interrupted run (FK-safe order)
  await testPool.query(
    `DELETE FROM payments
     WHERE user_id IN (SELECT id FROM users WHERE email = ANY($1::text[]))`,
    [allEmails]
  );
  await testPool.query(
    `DELETE FROM courses
     WHERE instructor_id IN (SELECT id FROM users WHERE email = ANY($1::text[]))`,
    [allEmails]
    // Cascades: course_modules → lessons → (nothing further)
    //           batches → batch_enrollments
  );
  await testPool.query(
    `DELETE FROM users WHERE email = ANY($1::text[])`,
    [allEmails]
    // Cascades: user_profiles, lesson_progress, batch_enrollments (user side)
  );
  await testPool.query(
    `DELETE FROM otp_verifications WHERE email = ANY($1::text[])`,
    [allEmails]
  );

  // 2. Instructor
  const instrRow = await testPool.query(
    `INSERT INTO users (name, email, password, role)
     VALUES ('Jest Instructor', $1, $2, 'instructor') RETURNING id`,
    [EMAILS.instructor, hashed]
  );
  ids.instructor = instrRow.rows[0].id;
  await testPool.query(
    `INSERT INTO user_profiles (user_id) VALUES ($1)`,
    [ids.instructor]
  );

  // 3. Approved course owned by that instructor
  const courseRow = await testPool.query(
    `INSERT INTO courses
       (title, description, price, level, approval_status, instructor_id, is_active)
     VALUES ('Jest Security Course', 'Integration test', 0, 'Beginner', 'approved', $1, true)
     RETURNING id`,
    [ids.instructor]
  );
  ids.course = courseRow.rows[0].id;

  // 4. Module + lesson (needed for lesson-complete tests)
  const modRow = await testPool.query(
    `INSERT INTO course_modules (course_id, title, order_number)
     VALUES ($1, 'Jest Module', 1) RETURNING id`,
    [ids.course]
  );
  ids.module = modRow.rows[0].id;

  const lessonRow = await testPool.query(
    `INSERT INTO lessons (module_id, title, order_number)
     VALUES ($1, 'Jest Lesson', 1) RETURNING id`,
    [ids.module]
  );
  ids.lesson = lessonRow.rows[0].id;

  // 5. Batch linked to that course
  const batchRow = await testPool.query(
    `INSERT INTO batches
       (course_id, batch_name, start_date, end_date, max_students, status, timezone)
     VALUES ($1, 'Jest Batch', '2025-01-01', '2026-12-31', 50, 'started', 'Asia/Kolkata')
     RETURNING id`,
    [ids.course]
  );
  ids.batch = batchRow.rows[0].id;

  // 6. Unenrolled student — no payment, no batch_enrollment
  const unenrRow = await testPool.query(
    `INSERT INTO users (name, email, password, role)
     VALUES ('Jest Unenrolled', $1, $2, 'student') RETURNING id`,
    [EMAILS.unenrolled, hashed]
  );
  ids.unenrolled = unenrRow.rows[0].id;
  await testPool.query(
    `INSERT INTO user_profiles (user_id) VALUES ($1)`,
    [ids.unenrolled]
  );

  // 7. Enrolled student — has payment (status='SUCCESS') + active batch_enrollment
  const enrRow = await testPool.query(
    `INSERT INTO users (name, email, password, role)
     VALUES ('Jest Enrolled', $1, $2, 'student') RETURNING id`,
    [EMAILS.enrolled, hashed]
  );
  ids.enrolled = enrRow.rows[0].id;
  await testPool.query(
    `INSERT INTO user_profiles (user_id) VALUES ($1)`,
    [ids.enrolled]
  );

  // Payment — payment_status stored as 'SUCCESS' to match makePayment controller
  await testPool.query(
    `INSERT INTO payments
       (user_id, batch_id, amount, payment_method, payment_status, transaction_id)
     VALUES ($1, $2, 0, 'TEST', 'SUCCESS', $3)`,
    [ids.enrolled, ids.batch, `TXN_JEST_${Date.now()}`]
  );

  // Active enrollment
  await testPool.query(
    `INSERT INTO batch_enrollments (batch_id, user_id, status)
     VALUES ($1, $2, true)`,
    [ids.batch, ids.enrolled]
  );

  // 8. Mint JWT tokens directly — identical payload to what login controller produces.
  //    This avoids calling the login HTTP endpoint (which triggers SMTP login-alert emails).
  tokens.unenrolled = makeToken(ids.unenrolled, "student");
  tokens.enrolled   = makeToken(ids.enrolled,   "student");
}, 20000);

// ═══════════════════════════════════════════════════════════════════════════════
// TEARDOWN
// ═══════════════════════════════════════════════════════════════════════════════
afterAll(async () => {
  const allEmails = Object.values(EMAILS);

  // Delete in FK-safe order so no constraint violations
  await testPool.query(
    `DELETE FROM payments
     WHERE user_id IN (SELECT id FROM users WHERE email = ANY($1::text[]))`,
    [allEmails]
  );
  await testPool.query(
    `DELETE FROM courses
     WHERE instructor_id IN (SELECT id FROM users WHERE email = ANY($1::text[]))`,
    [allEmails]
  );
  await testPool.query(
    `DELETE FROM users WHERE email = ANY($1::text[])`,
    [allEmails]
  );
  await testPool.query(
    `DELETE FROM otp_verifications WHERE email = ANY($1::text[])`,
    [allEmails]
  );

  // Close pools so Jest can exit without open-handle warnings.
  // testPool: fully under our control — no persistent connections, drains immediately.
  // db (app pool): db.connect() has been removed from db.js, so all connections are idle
  //                and pool.end() completes quickly.
  await testPool.end();
  await db.end();
}, 20000);


// ═══════════════════════════════════════════════════════════════════════════════
// SUITE 1: Registration Role Escalation
// ═══════════════════════════════════════════════════════════════════════════════
describe("Fix 1 — Registration Role Escalation", () => {
  /**
   * Strategy:
   *   POST /register performs the DB INSERT into otp_verifications BEFORE
   *   calling sendMail. sendMail catches its own SMTP errors internally and
   *   never throws — so the controller always returns 200.
   *
   *   We assert that what got written to otp_verifications has role='student',
   *   regardless of the role='admin' sent in the request body.
   */
  test(
    "POST /register with role='admin' in body stores role='student' in otp_verifications",
    async () => {
      await testPool.query(
        `DELETE FROM otp_verifications WHERE email = $1`,
        [EMAILS.roleEscalation]
      );

      // Call the real register endpoint. SMTP may log an error but never throws,
      // so this always resolves with 200.
      const res = await request(app)
        .post("/api/users/register")
        .send({
          username: "RoleHacker",
          email:    EMAILS.roleEscalation,
          password: "Hack123!",
          role:     "admin",           // <── must be ignored by the controller
        });

      expect(res.statusCode).toBe(200);

      // Assert the DB row has role='student', NOT the 'admin' sent by client
      const row = await testPool.query(
        `SELECT role FROM otp_verifications WHERE email = $1`,
        [EMAILS.roleEscalation]
      );
      expect(row.rows.length).toBe(1);
      expect(row.rows[0].role).toBe("student");
    },
    15000   // allow time for bcrypt + SMTP timeout/failure
  );
});


// ═══════════════════════════════════════════════════════════════════════════════
// SUITE 2: Course Content Access Guard
// ═══════════════════════════════════════════════════════════════════════════════
describe("Fix 2 — Course Content Access Guard", () => {
  test("Unauthenticated request returns 401", async () => {
    const res = await request(app)
      .get(`/api/courses/${ids.course}/content`);

    expect(res.statusCode).toBe(401);
  });

  test("Unenrolled student cannot access course content — expects 403", async () => {
    const res = await request(app)
      .get(`/api/courses/${ids.course}/content`)
      .set("Authorization", `Bearer ${tokens.unenrolled}`);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toMatch(/access denied|enrolled/i);
  });

  test("Enrolled student can access course content — expects 200 with module list", async () => {
    const res = await request(app)
      .get(`/api/courses/${ids.course}/content`)
      .set("Authorization", `Bearer ${tokens.enrolled}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    // The test module we created must be in the response
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty("module_title", "Jest Module");
  });
});


// ═══════════════════════════════════════════════════════════════════════════════
// SUITE 3: Lesson Completion Enrollment Check
// ═══════════════════════════════════════════════════════════════════════════════
describe("Fix 3 — Lesson Completion Enrollment Check", () => {
  test("Unenrolled student cannot mark a lesson complete — expects 403", async () => {
    const res = await request(app)
      .post(`/api/courses/lessons/${ids.lesson}/complete`)
      .set("Authorization", `Bearer ${tokens.unenrolled}`);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toMatch(/access denied|enrolled/i);
  });

  test("Enrolled student can mark a lesson complete — expects 200", async () => {
    const res = await request(app)
      .post(`/api/courses/lessons/${ids.lesson}/complete`)
      .set("Authorization", `Bearer ${tokens.enrolled}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("completed", true);
  });
});


// ═══════════════════════════════════════════════════════════════════════════════
// SUITE 4: Enrollment Requires Completed Payment
// ═══════════════════════════════════════════════════════════════════════════════
describe("Fix 4 — Enrollment Requires Completed Payment", () => {
  test("Student with no payment cannot enroll in a batch — expects 403", async () => {
    const res = await request(app)
      .post(`/api/student/batches/${ids.batch}/enroll`)
      .set("Authorization", `Bearer ${tokens.unenrolled}`);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toMatch(/payment required/i);
  });
});
