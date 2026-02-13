ALTER TABLE courses
ADD COLUMN IF NOT EXISTS approval_status VARCHAR(20) NOT NULL DEFAULT 'pending';

UPDATE courses
SET approval_status = 'approved'
WHERE approval_status IS NULL;
