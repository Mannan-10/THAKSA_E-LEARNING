export default function CoursesPage() {
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024;

  const courses = [
    {
      title: "Cloud & DevOps Engineering",
      desc: "A structured program covering cloud infrastructure, DevOps practices, CI/CD pipelines, and real-world automation.",
      level: "Beginner to Advanced",
      duration: "4 Months",
      skills: "AWS, Linux, Docker, Kubernetes, CI/CD, Terraform",
    },
    {
      title: "Data Science & Machine Learning",
      desc: "Learn data analysis, machine learning, and deployment workflows with a strong focus on fundamentals and projects.",
      level: "Intermediate",
      duration: "4 Months",
      skills: "Python, Pandas, ML, Statistics, MLOps",
    },
    {
      title: "Software Testing & Automation",
      desc: "Build a strong testing foundation with automation frameworks and practical test engineering skills.",
      level: "Beginner",
      duration: "3 Months",
      skills: "Selenium, Java, Automation Testing, QA Fundamentals",
    },
    {
      title: "Full Stack Software Engineering",
      desc: "Develop full stack applications with strong backend logic, frontend structure, and system thinking.",
      level: "Intermediate",
      duration: "4 Months",
      skills: "JavaScript, React, Backend APIs, Databases",
    },
  ];

  return (
    <section
      style={{
        padding: isMobile ? "60px 20px" : "100px 100px",
        background: "#f8fafc",
        minHeight: "calc(100vh - 80px)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
  
        <div style={{ textAlign: "center", marginBottom: "70px" }}>
          <h1
            style={{
              fontSize: isMobile ? "32px" : "42px",
              fontWeight: "800",
              color: "#0f172a",
              marginBottom: "14px",
            }}
          >
            Courses
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "#475569",
              maxWidth: "720px",
              margin: "0 auto",
            }}
          >
            Professionally designed programs focused on building strong
            fundamentals, practical skills, and long-term career readiness.
          </p>
        </div>

  
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : isTablet
              ? "repeat(2, 1fr)"
              : "repeat(3, 1fr)",
            gap: "32px",
          }}
        >
          {courses.map((course) => (
            <div
              key={course.title}
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "28px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
                border: "1px solid #e5e7eb",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
          
              <div>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#0f172a",
                    marginBottom: "10px",
                  }}
                >
                  {course.title}
                </h3>

                <p style={descStyle}>{course.desc}</p>

                <p style={infoStyle}>
                  <strong>Level:</strong> {course.level}
                </p>
                <p style={infoStyle}>
                  <strong>Duration:</strong> {course.duration}
                </p>
                <p style={infoStyle}>
                  <strong>Skills Covered:</strong> {course.skills}
                </p>
              </div>

              {/* CTA */}
              <button
                style={{
                  marginTop: "24px",
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "12px",
                  borderRadius: "12px",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                View Course Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const descStyle = {
  fontSize: "15px",
  color: "#475569",
  marginBottom: "14px",
  lineHeight: "1.6",
};

const infoStyle = {
  fontSize: "14px",
  color: "#475569",
  marginBottom: "6px",
};
