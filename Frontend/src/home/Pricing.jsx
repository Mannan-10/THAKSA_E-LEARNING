export default function Pricing() {
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024;

  const plans = [
    {
      name: "Foundation Track",
      price: "₹15,000",
      duration: "3 Months",
      desc: "For beginners who want to build strong fundamentals with structured guidance.",
      features: [
        "Core concepts & fundamentals",
        "Structured learning roadmap",
        "Recorded sessions access",
        "Basic project exposure",
      ],
      highlight: false,
    },
    {
      name: "Professional Track",
      price: "₹30,000",
      duration: "4 Months",
      desc: "For motivated learners serious about building job-ready skills.",
      features: [
        "Complete structured curriculum",
        "Live sessions & mentoring",
        "Real-world projects",
        "Interview & career guidance",
        "Continuous progress evaluation",
      ],
      highlight: true,
    },
    {
      name: "Advanced Mentorship",
      price: "₹45,000",
      duration: "4+ Months",
      desc: "For highly committed students seeking deep mentorship and individual guidance.",
      features: [
        "Everything in Professional Track",
        "1-to-1 mentorship sessions",
        "Advanced system design thinking",
        "Personalized growth roadmap",
        "Extended career support",
      ],
      highlight: false,
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
            Pricing
          </span>

          <h2
            style={{
              fontSize: isMobile ? "30px" : "40px",
              fontWeight: "800",
              color: "#0f172a",
              marginBottom: "14px",
            }}
          >
            Simple, Transparent Pricing
          </h2>

          <p
            style={{
              fontSize: "18px",
              color: "#475569",
              maxWidth: "680px",
              margin: "0 auto",
            }}
          >
            Designed for learners who value structured growth, discipline,
            and long-term career outcomes — not shortcuts.
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
          {plans.map((plan) => (
            <div
              key={plan.name}
              style={{
                background: "white",
                borderRadius: "22px",
                padding: "32px",
                border: plan.highlight
                  ? "2px solid #2563eb"
                  : "1px solid #e5e7eb",
                boxShadow: plan.highlight
                  ? "0 20px 40px rgba(37,99,235,0.15)"
                  : "0 10px 25px rgba(0,0,0,0.06)",
                transform: plan.highlight ? "scale(1.03)" : "none",
              }}
            >
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  marginBottom: "6px",
                  color: "#0f172a",
                }}
              >
                {plan.name}
              </h3>

              <p
                style={{
                  fontSize: "14px",
                  color: "#475569",
                  marginBottom: "20px",
                }}
              >
                {plan.desc}
              </p>

              <div
                style={{
                  fontSize: "36px",
                  fontWeight: "800",
                  color: "#2563eb",
                  marginBottom: "6px",
                }}
              >
                {plan.price}
              </div>

              <p
                style={{
                  fontSize: "14px",
                  color: "#64748b",
                  marginBottom: "24px",
                }}
              >
                Duration: {plan.duration}
              </p>

        
              <ul
                style={{
                  paddingLeft: "18px",
                  marginBottom: "32px",
                  color: "#475569",
                }}
              >
                {plan.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      marginBottom: "10px",
                      fontSize: "15px",
                    }}
                  >
                    {f}
                  </li>
                ))}
              </ul>

              <button
                style={{
                  width: "100%",
                  background: plan.highlight
                    ? "#2563eb"
                    : "transparent",
                  color: plan.highlight ? "white" : "#2563eb",
                  border: plan.highlight
                    ? "none"
                    : "2px solid #bfdbfe",
                  padding: "14px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                {plan.highlight
                  ? "Get Started"
                  : "Learn More"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
