# THAKSA E-Learning: Project Overview & Next Steps

## 1) Project Overview
- **Frontend**: React + Vite + MUI (`Frontend/`)
- **Backend**: Express + PostgreSQL (`Backend/`)
- **Auth**: OTP-based signup, login, profile/password management
- **Roles**: `student`, `instructor`, `admin`
- **Core Modules**:
  - Courses
  - Batches
  - Enrollments
  - Payments
  - Lessons/Progress
  - Reviews
  - Certificates
  - Contact form

## 2) Product Direction (Confirmed)
- **Learning mode = Live sessions**
- **Course** should represent the complete offering:
  - full description
  - outcomes
  - duration
  - number of batches
  - number of instructors handling that course
- **Batch** should represent delivery instances of a course:
  - started
  - upcoming (joinable)
  - completed

## 3) Current State (Important)
- Public `CoursesPage` and `BatchesPage` are currently **static UI data** (not API-driven yet).
- Backend batch/enrollment/payment exist, but the live-session model is not fully standardized yet.
- Some backend quality fixes are still needed before scaling:
  - `batchController`: `start_data` typo should be `start_date`.
  - `paymentController`: query issue in `getMyPayments` (`b.batch_name c.title ...` needs proper SQL aliasing/comma).
  - Add stronger validation and transactional safety in enrollment/payment paths.

## 4) What To Work On First (Phase 1)
### Goal
Make Courses + Batches production-ready for **live-session delivery** with correct information architecture.

### IA Structure (Target)
- **Home Page**
  - Instructor showcase section
  - Batch section grouped by status: `Upcoming`, `Started`, `Completed`
  - CTA: `View all batches`
- **Courses Page**
  - all courses with summary, duration, instructors count, batches count, outcomes preview
  - CTA to course details
- **Course Details Page**
  - complete description
  - outcomes
  - duration and mode
  - instructors list
  - batch summary by status
- **Batches Page**
  - tabs/filters: `Upcoming`, `Started`, `Completed`
  - cards with course, instructor, schedule/timezone, seat status, CTA

### Step 1: Finalize Data Model (Do this first)
- Add/confirm fields for live learning:
  - `courses`: `mode`, `duration_weeks`, `outcomes_json`, `is_active`
  - `batches`: `timezone`, `days_of_week`, `session_time`, `meeting_link`, `seat_limit`, `enrollment_deadline`, `status`, `instructor_id`
- Add constraints:
  - `seat_limit > 0`
  - valid `status` enum (`upcoming`, `started`, `completed`)

### Step 2: Backend APIs for Live Courses/Batches
- Student/public APIs:
  - `GET /api/courses` (course-level metadata + counts + outcomes preview)
  - `GET /api/courses/:id` (full details)
  - `GET /api/courses/:id/batches`
  - `GET /api/batches?status=upcoming|started|completed`
- Instructor APIs:
  - Create/update/cancel batch
  - Manage meeting link and schedule
- Enrollment APIs:
  - block enrollment if seats full
  - block enrollment after deadline
  - enforce unique enrollment

### Step 3: Frontend Integration (Replace Static Data)
- `CoursesPage` -> fetch live courses from backend
- `BatchesPage` -> fetch real batch cards grouped by status
- Home page -> show instructors + batch status sections
- Add CTA flow:
  - `View Batches` from course card
  - `Enroll` from batch card
- Show clear labels:
  - `Mode: Live Session`
  - timezone-aware session timing

## 5) Phase 2 (Immediately After Phase 1)
- Payments hardening:
  - use payment gateway verification hooks
  - enroll only after verified payment success
- Student dashboard:
  - upcoming live sessions
  - joined batch details + meeting link access
- Instructor dashboard:
  - batch roster, attendance-ready view, live session controls

## 6) Phase 3 (Quality & Scale)
- Centralized validation layer for all request payloads
- Error handler middleware (consistent API error format)
- Activity/audit logs for admin + security actions
- Testing:
  - backend API tests (auth, batch, enrollment, payment)
  - frontend integration tests for critical journeys
- Deployment readiness:
  - environment split, CORS whitelist, rate limiting, monitoring

## 7) Immediate Execution Order (One by One)
1. Fix backend known issues (`start_date`, payment SQL, validations).
2. Lock final live-session schema + migration.
3. Implement course/batch listing APIs for students.
4. Connect `CoursesPage` and `BatchesPage` to APIs.
5. Implement enrollment capacity/deadline logic.
6. Test complete student flow: browse -> select batch -> enroll.
7. Move to payment verification hardening.

## 8) Similar Website Pattern (Applied to THAKSA)
- Pattern to follow:
  - Course pages are outcome-heavy and trust-heavy.
  - Batch pages are schedule-heavy and action-heavy.
  - Home page highlights instructors + join windows.
- THAKSA adaptation:
  - Keep course as the primary information unit.
  - Keep batches as operational delivery timelines with status.
  - Keep instructor visibility on both home and course detail pages.

### Reference Signals (What others show clearly)
- Coursera (program/course structure): outcomes, skills, duration, instructor, multi-course series.
  - https://www.coursera.org/professional-certificates/google-data-analytics
- edX (paced learning model): explicit distinction of instructor-paced schedule behavior.
  - https://edxsupport.zendesk.com/hc/en-us/articles/115011202847-What-is-self-paced-or-instructor-paced-Which-is-my-course
- Masai (live/cohort messaging): batch start date, duration, timings, instructor/curriculum sections.
  - https://www.masaischool.com/
  - https://masaischool.com/courses/data-analytics

---

## Recommendation: Start Now
Start with **Step 1 + Step 2** in Phase 1:
- finalize schema for live sessions
- fix backend issues
- expose clean APIs

Then frontend work becomes straightforward and stable.
