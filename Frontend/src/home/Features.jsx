export default function Features() {
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024;

  const features = [
    {
      title: "Project-Based Learning",
      desc: "Every concept is reinforced through real-world projects that reflect actual industry workflows, not toy examples.",
    },
    {
      title: "Industry-Driven Curriculum",
      desc: "Curriculum designed from real production experience in AWS, DevOps, Data, ML, and testing environments.",
    },
    {
      title: "Structured Career Roadmap",
      desc: "Clear learning paths that guide students step-by-step from fundamentals to job-ready skill sets.",
    },
    {
      title: "Individual Mentorship Focus",
      desc: "Personal guidance based on each student’s mindset, strengths, and areas of improvement.",
    },
    {
      title: "Realistic Skill Development",
      desc: "No shortcuts or hype — focus on building strong foundations and practical engineering thinking.",
    },
    {
      title: "Long-Term Career Guidance",
      desc: "Preparation for sustainable careers, not just course completion or short-term outcomes.",
    },
  ];

  return (
    <section
      style={{
        padding: isMobile ? "60px 20px" : "100px 100px",
        background: "#f8fafc",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
     
        <div
          style={{
            textAlign: "center",
            marginBottom: "70px",
          }}
        >
          <span
            style={{
              display: "inline-block",
              background: "#dbeafe",
              color: "#2563eb",
              padding: "6px 16px",
              borderRadius: "999px",
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "16px",
            }}
          >
            Why Choose Us
          </span>

          <h2
            style={{
              fontSize: isMobile ? "30px" : "40px",
              fontWeight: "800",
              color: "#0f172a",
              marginBottom: "14px",
            }}
          >
            Features That Set Us Apart
          </h2>

          <p
            style={{
              fontSize: "18px",
              color: "#475569",
              maxWidth: "640px",
              margin: "0 auto",
            }}
          >
            Everything you need to build strong fundamentals, practical skills,
            and a sustainable tech career.
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
          {features.map((item) => (
            <div
              key={item.title}
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "28px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
              }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  marginBottom: "12px",
                  color: "#0f172a",
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  fontSize: "16px",
                  color: "#475569",
                  lineHeight: "1.6",
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
