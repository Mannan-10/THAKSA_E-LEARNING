export default function Testimonials() {
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024;

  const testimonials = [
    {
      name: "Akhil Reddy",
      role: "DevOps Engineer",
      text: "The training was structured and realistic. Concepts were explained deeply, with a strong focus on fundamentals and real-world scenarios. It helped me transition confidently into a DevOps role.",
    },
    {
      name: "Sowmya K",
      role: "Data Science Learner",
      text: "What stood out was the discipline and clarity in teaching. Every topic followed a clear roadmap, and individual guidance helped me understand where I needed to improve.",
    },
    {
      name: "Rahul Sharma",
      role: "Cloud & Automation Engineer",
      text: "This was not a shortcut-based course. It required effort, but the structured approach and continuous guidance made a real difference in my thinking and skill level.",
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
            Student Experiences
          </span>

          <h2
            style={{
              fontSize: isMobile ? "30px" : "40px",
              fontWeight: "800",
              color: "#0f172a",
              marginBottom: "14px",
            }}
          >
            Learning That Creates Real Growth
          </h2>

          <p
            style={{
              fontSize: "18px",
              color: "#475569",
              maxWidth: "640px",
              margin: "0 auto",
            }}
          >
            Honest feedback from learners who committed to the process
            and experienced long-term improvement.
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
          {testimonials.map((item) => (
            <div
              key={item.name}
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "28px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
              }}
            >
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: "1.7",
                  color: "#334155",
                  marginBottom: "20px",
                }}
              >
                “{item.text}”
              </p>

              <div>
                <strong
                  style={{
                    display: "block",
                    fontSize: "16px",
                    color: "#0f172a",
                  }}
                >
                  {item.name}
                </strong>
                <span
                  style={{
                    fontSize: "14px",
                    color: "#475569",
                  }}
                >
                  {item.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
