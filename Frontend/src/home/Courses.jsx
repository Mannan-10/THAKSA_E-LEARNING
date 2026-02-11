export default function Courses() {
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024;

  const courses = [
    {
      title: "AWS Cloud Practitioner",
      level: "Beginner to Advanced",
      duration: "4 Months",
      tag: "Bestseller",
    },
    {
      title: "Data Science & Machine Learning",
      level: "Intermediate",
      duration: "5 Months",
      tag: "Popular",
    },
    {
      title: "DevOps & Cloud Engineering",
      level: "Intermediate",
      duration: "3 Months",
      tag: "Trending",
    },
    {
      title: "DevOps & Cloud Engineering",
      level: "Intermediate",
      duration: "3 Months",
      tag: "Trending",
    },{
      title: "DevOps & Cloud Engineering",
      level: "Intermediate",
      duration: "3 Months",
      tag: "Trending",
    },{
      title: "DevOps & Cloud Engineering",
      level: "Intermediate",
      duration: "3 Months",
      tag: "Trending",
    },
  ];

  return (
    <section
      style={{
        padding: isMobile ? "60px 20px" : "100px 100px",
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* SECTION HEADER */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "60px",
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? "32px" : "40px",
              fontWeight: "800",
              marginBottom: "16px",
              color: "#0f172a",
            }}
          >
            Popular Courses
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "#475569",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Industry-focused programs designed to take you
            from fundamentals to job-ready.
          </p>
        </div>

        {/* COURSES GRID */}
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
                boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* TAG */}
              <span
                style={{
                  alignSelf: "flex-start",
                  background: "#dbeafe",
                  color: "#2563eb",
                  padding: "6px 12px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: "600",
                  marginBottom: "20px",
                }}
              >
                {course.tag}
              </span>

              {/* CONTENT */}
              <div>
                <h3
                  style={{
                    fontSize: "22px",
                    fontWeight: "700",
                    marginBottom: "12px",
                    color: "#0f172a",
                  }}
                >
                  {course.title}
                </h3>

                <p
                  style={{
                    fontSize: "15px",
                    color: "#475569",
                    marginBottom: "8px",
                  }}
                >
                  Level: {course.level}
                </p>

                <p
                  style={{
                    fontSize: "15px",
                    color: "#475569",
                  }}
                >
                  Duration: {course.duration}
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
                View Program →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
