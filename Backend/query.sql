-- USERS
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  role VARCHAR(20) DEFAULT 'student',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- USER PROFILES
CREATE TABLE user_profiles (
  id SERIAL PRIMARY KEY,
  user_id INT UNIQUE NOT NULL,
  phone VARCHAR(20),
  bio TEXT,
  profile_image VARCHAR,
  date_of_birth DATE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- COURSES
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price INT NOT NULL,
  level VARCHAR(50),
  instructor_id INT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (instructor_id) REFERENCES users(id)
);

-- COURSE MODULES
CREATE TABLE course_modules (
  id SERIAL PRIMARY KEY,
  course_id INT NOT NULL,
  title TEXT NOT NULL,
  order_number INT,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- LESSONS
CREATE TABLE lessons (
  id SERIAL PRIMARY KEY,
  module_id INT NOT NULL,
  title TEXT NOT NULL,
  video_url VARCHAR,
  duration INTERVAL,
  order_number INT,
  FOREIGN KEY (module_id) REFERENCES course_modules(id) ON DELETE CASCADE
);

-- BATCHES
CREATE TABLE batches (
  id SERIAL PRIMARY KEY,
  course_id INT NOT NULL,
  batch_name TEXT,
  start_date DATE,
  end_date DATE,
  schedule TIME,
  max_students INT,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- BATCH ENROLLMENTS
CREATE TABLE batch_enrollments (
  id SERIAL PRIMARY KEY,
  batch_id INT NOT NULL,
  user_id INT NOT NULL,
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status BOOLEAN DEFAULT true,
  FOREIGN KEY (batch_id) REFERENCES batches(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- PAYMENTS
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  batch_id INT NOT NULL,
  amount INT NOT NULL,
  payment_method VARCHAR(50),
  payment_status VARCHAR(30),
  transaction_id VARCHAR UNIQUE,
  paid_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (batch_id) REFERENCES batches(id)
);

-- LESSON PROGRESS
CREATE TABLE lesson_progress (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  lesson_id INT NOT NULL,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

-- CERTIFICATES
CREATE TABLE certificates (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  course_id INT NOT NULL,
  issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  certificate_url VARCHAR,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- REVIEWS
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  course_id INT NOT NULL,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- OTP VERIFICATIONS
CREATE TABLE otp_verifications (
  email VARCHAR(255) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  otp VARCHAR(6) NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(20),
  expires_at TIMESTAMP NOT NULL
);


CREATE TABLE refresh_tokens (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  token TEXT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
