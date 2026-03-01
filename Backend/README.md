# THAKSA E-Learning — Backend

<div align="center">
  <h3>⚙️ RESTful API server powering the THAKSA E-Learning platform</h3>
  <p>Node.js · Express · PostgreSQL · JWT · Nodemailer</p>
</div>

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| [Node.js](https://nodejs.org/) | 18+ | Runtime |
| [Express](https://expressjs.com/) | 5.x | Web framework |
| [PostgreSQL](https://www.postgresql.org/) | 14+ | Relational database |
| [pg](https://node-postgres.com/) | 8.x | PostgreSQL client |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js) | 6.x | Password hashing |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | 9.x | JWT authentication |
| [nodemailer](https://nodemailer.com/) | 7.x | Email (OTP, notifications) |
| [dotenv](https://github.com/motdotla/dotenv) | 17.x | Environment config |
| [cors](https://github.com/expressjs/cors) | 2.x | Cross-Origin Resource Sharing |
| [nodemon](https://nodemon.io/) | 3.x | Dev auto-restart |

---

## 📁 Project Structure

```
Backend/
├── src/
│   ├── config/             # Database connection (pg pool)
│   ├── constants/          # Shared constants & enums
│   ├── controller/         # Route handler logic
│   │   ├── userController.js
│   │   ├── adminController.js
│   │   ├── instructorController.js
│   │   ├── courseController.js
│   │   ├── batchController.js
│   │   ├── enrollmentController.js
│   │   ├── attendanceController.js
│   │   ├── liveSessionController.js
│   │   ├── assessmentController.js
│   │   └── ...
│   ├── middlewares/
│   │   ├── authMiddleware.js   # JWT verification
│   │   └── roleMiddleware.js   # Role-based access
│   ├── routes/             # Express routers
│   └── utils/              # Helper utilities
├── migrations/             # SQL schema migration files
├── query.sql               # Full database schema
├── index.js                # App entry point
├── package.json
└── .env                    # Environment variables (DO NOT COMMIT)
```

---

## ⚡ Prerequisites

Make sure the following are installed:

- **Node.js** v18 or higher → [Download](https://nodejs.org/)
- **npm** v9 or higher
- **PostgreSQL** v14 or higher → [Download](https://www.postgresql.org/download/)
- A PostgreSQL client such as [pgAdmin](https://www.pgadmin.org/) or [DBeaver](https://dbeaver.io/)

---

## 🚀 Setup & Installation

### Step 1 — Clone the Repository

```bash
git clone https://github.com/your-username/THAKSA_E-LEARNING.git
cd THAKSA_E-LEARNING/Backend
```

### Step 2 — Install Dependencies

```bash
npm install
```

### Step 3 — Set Up PostgreSQL Database

1. Open **pgAdmin** or your PostgreSQL terminal (`psql`)
2. Create a new database named `thaksa`:

```sql
CREATE DATABASE thaksa;
```

3. Connect to the `thaksa` database and run the full schema:

```bash
psql -U postgres -d thaksa -f query.sql
```

Or paste the contents of `query.sql` into pgAdmin's Query Tool and execute.

### Step 4 — Configure Environment Variables

Create a `.env` file in the `Backend/` directory:

```bash
# Backend/.env

# Server
PORT=3000

# PostgreSQL Database
DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=thaksa
DB_PASSWORD=your_postgres_password
DB_PORT=5432

# JSON Web Token
JWT_SECRET=your_super_secret_jwt_key_here

# Gmail (for OTP + email notifications)
GMAIL=your_email@gmail.com
PASSWORD=your_gmail_app_password
```

> **⚠️ Important:** For `PASSWORD`, use a **Gmail App Password**, not your actual Gmail password.
> Generate one at: [Google App Passwords](https://myaccount.google.com/apppasswords)

> **🔒 Never commit your `.env` file.** It's already in `.gitignore`.

### Step 5 — Run the Server

**Development mode** (auto-restart on file changes):

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

The API server will start at → **http://localhost:3000**

You should see:
```
Server is running on http://localhost:3000
```

---

## 🔌 API Routes Overview

| Method | Base Path | Description |
|--------|-----------|-------------|
| `POST/GET` | `/api/users` | Auth — register, login, OTP, profile |
| `GET/PUT` | `/api/admin` | Admin — manage users, courses, batches |
| `GET/PUT` | `/api/instructor` | Instructor — manage batches, sessions |
| `GET` | `/api/courses` | Public course listing + details |
| `GET/POST` | `/api/batches` | Batch management |
| `POST` | `/api/enroll` | Course enrollment |
| `POST` | `/api/payment` | Payment processing |
| `GET/POST` | `/api/attendance` | Student attendance |
| `GET/POST` | `/api/live-sessions` | Live class sessions |
| `GET/POST` | `/api/certificates` | Certificate generation |
| `GET/POST` | `/api/reviews` | Course reviews |
| `POST` | `/api/contact` | Contact form submission |

All protected routes require a `Bearer` token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

---

## 🗄️ Database Schema

The full schema is located in [`query.sql`](./query.sql).

**Key Tables:**

| Table | Description |
|-------|-------------|
| `users` | All users (students, instructors, admins) |
| `courses` | Course catalog |
| `modules` | Course modules |
| `lessons` | Individual lessons inside modules |
| `batches` | Batch/cohort definitions |
| `enrollments` | User × course enrollments |
| `attendance` | Session attendance records |
| `live_sessions` | Scheduled live classes |
| `reviews` | Course ratings & reviews |
| `certificates` | Issued certificates |
| `payments` | Payment transactions |

---

## 🔐 Authentication Flow

```
POST /api/users/register   → Create account
POST /api/users/login      → Returns JWT token
POST /api/users/forgot-password → Sends OTP via email
POST /api/users/verify-otp      → Validate OTP
POST /api/users/reset-password  → Update password
```

---

## 🐛 Common Issues

| Problem | Solution |
|---------|----------|
| `ECONNREFUSED` on DB | Ensure PostgreSQL service is running |
| `password authentication failed` | Check `DB_PASSWORD` in `.env` |
| Email not sending | Verify Gmail App Password; enable 2FA first |
| `JWT malformed` | Check `JWT_SECRET` matches in `.env` |
| Port already in use | Change `PORT` in `.env` or kill the process |

---

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start server with nodemon (development) |
| `npm start` | Start server with node (production) |

---

## 🔗 Frontend

The React frontend runs separately. See [`../Frontend/README.md`](../Frontend/README.md) for setup instructions.

---

## 📄 License

© 2025 THAKSA Academy. All rights reserved.
