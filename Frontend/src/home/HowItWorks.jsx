export default function HowItWorks() {
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024;

  const steps = [
    {
      step: "01",
      title: "Foundation & Mindset",
      desc: "Students begin by building strong fundamentals and the right engineering mindset required for long-term growth.",
    },
    {
      step: "02",
      title: "Structured Skill Building",
      desc: "Concepts are taught in a disciplined sequence across AWS, DevOps, Data, ML, testing, and modern tooling.",
    },
    {
      step: "03",
      title: "Real-World Projects",
      desc: "Hands-on projects designed around real industry workflows help students think and work like professionals.",
    },
    {
      step: "04",
      title: "Career Preparation & Guidance",
      desc: "Focused guidance on interviews, system thinking, and role readiness to transition confidently into the industry.",
    },
  ];

  return (
    <section
      style={{
        padding: isMobile ? "60px 20px" : "100px 100px",
        background: "#ffffff",
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
              background: "#e0e7ff",
              color: "#3730a3",
              padding: "6px 16px",
              borderRadius: "999px",
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "16px",
            }}
          >
            How It Works
          </span>

          <h2
            style={{
              fontSize: isMobile ? "30px" : "40px",
              fontWeight: "800",
              color: "#0f172a",
              marginBottom: "14px",
            }}
          >
            A Clear, Structured Learning Journey
          </h2>

          <p
            style={{
              fontSize: "18px",
              color: "#475569",
              maxWidth: "640px",
              margin: "0 auto",
            }}
          >
            From fundamentals to career readiness — guided through a disciplined
            and realistic roadmap.
          </p>
        </div>

 
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : isTablet
              ? "repeat(2, 1fr)"
              : "repeat(4, 1fr)",
            gap: "32px",
          }}
        >
          {steps.map((item) => (
            <div
              key={item.step}
              style={{
                background: "#f8fafc",
                borderRadius: "20px",
                padding: "28px",
                border: "1px solid #e5e7eb",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#2563eb",
                  marginBottom: "12px",
                }}
              >
                STEP {item.step}
              </div>

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
