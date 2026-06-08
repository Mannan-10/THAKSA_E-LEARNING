-- SkillForge Foreign Key Indexes Migration
-- Created on: 2026-06-08

-- 1. Courses
CREATE INDEX IF NOT EXISTS idx_courses_instructor_id ON courses(instructor_id);

-- 2. Course Modules
CREATE INDEX IF NOT EXISTS idx_course_modules_course_id ON course_modules(course_id);

-- 3. Lessons
CREATE INDEX IF NOT EXISTS idx_lessons_module_id ON lessons(module_id);

-- 4. Batches
CREATE INDEX IF NOT EXISTS idx_batches_course_id ON batches(course_id);

-- 5. Batch Enrollments
CREATE INDEX IF NOT EXISTS idx_batch_enrollments_batch_id ON batch_enrollments(batch_id);
CREATE INDEX IF NOT EXISTS idx_batch_enrollments_user_id ON batch_enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_batch_enrollments_user_batch ON batch_enrollments(user_id, batch_id);

-- 6. Payments
CREATE INDEX IF NOT EXISTS idx_payments_batch_id ON payments(batch_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_batch ON payments(user_id, batch_id);

-- 7. Lesson Progress
-- Note: user_id and composite (user_id, lesson_id) are already indexed by unique_lesson_progress constraint.
CREATE INDEX IF NOT EXISTS idx_lesson_progress_lesson_id ON lesson_progress(lesson_id);

-- 8. Certificates
CREATE INDEX IF NOT EXISTS idx_certificates_user_id ON certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_course_id ON certificates(course_id);

-- 9. Reviews
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_course_id ON reviews(course_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_course ON reviews(user_id, course_id);

-- 10. Refresh Tokens
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON refresh_tokens(user_id);
