-- Batch live-delivery metadata
ALTER TABLE batches
ADD COLUMN IF NOT EXISTS status VARCHAR(20) NOT NULL DEFAULT 'upcoming',
ADD COLUMN IF NOT EXISTS timezone VARCHAR(100) NOT NULL DEFAULT 'Asia/Kolkata',
ADD COLUMN IF NOT EXISTS days_of_week VARCHAR(100),
ADD COLUMN IF NOT EXISTS session_time TIME,
ADD COLUMN IF NOT EXISTS enrollment_deadline TIMESTAMP;

ALTER TABLE batches
ADD CONSTRAINT batches_status_check
CHECK (status IN ('upcoming', 'started', 'completed'));

--(google Meet first)
CREATE TABLE IF NOT EXISTS live_sessions (
  id SERIAL PRIMARY KEY,
  batch_id INT NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
  instructor_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  provider VARCHAR(30) NOT NULL DEFAULT 'google_meet',
  status VARCHAR(20) NOT NULL DEFAULT 'scheduled',
  scheduled_at TIMESTAMP NOT NULL,
  duration_minutes INT NOT NULL DEFAULT 60,
  join_url TEXT NOT NULL,
  host_url TEXT,
  recording_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE live_sessions
ADD CONSTRAINT live_sessions_status_check
CHECK (status IN ('scheduled', 'live', 'completed', 'cancelled'));

CREATE INDEX IF NOT EXISTS idx_live_sessions_batch_id ON live_sessions(batch_id);
CREATE INDEX IF NOT EXISTS idx_live_sessions_instructor_id ON live_sessions(instructor_id);
CREATE INDEX IF NOT EXISTS idx_live_sessions_status ON live_sessions(status);
CREATE INDEX IF NOT EXISTS idx_live_sessions_scheduled_at ON live_sessions(scheduled_at);
