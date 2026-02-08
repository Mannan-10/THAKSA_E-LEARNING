export default function PricingPage() {
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024;

  const plans = [
    {
      name: "Foundation Track",
      for: "Beginners building strong fundamentals",
      price: "₹15,000",
      duration: "3 Months",
      includes: [
        "Core fundamentals & concepts",
        "Structured learning roadmap",
        "Recorded session access",
        "Basic project exposure",
      ],
      highlight: false,
    },
    {
      name: "Professional Track",
      for: "Serious learners preparing for industry roles",
      price: "₹30,000",
      duration: "4 Months",
      includes: [
        "Complete structured curriculum",
        "Live instructor-led sessions",
        "Real-world projects",
        "Career & interview guidance",
        "Continuous evaluation & feedback",
      ],
      highlight: true,
    },
    {
      name: "Advanced Mentorship",
      for: "Highly motivated learners seeking deep guidance",
      price: "₹45,000",
      duration: "4+ Months",
      includes: [
        "Everything in Professional Track",
        "1-to-1 mentorship sessions",
        "Advanced system & architecture thinking",
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
            Pricing
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "#475569",
              maxWidth: "760px",
              margin: "0 auto",
            }}
          >
            Transparent pricing designed for learners who value structured
            growth, discipline, and long-term career development — not shortcuts.
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
                  color: "#0f172a",
                  marginBottom: "6px",
                }}
              >
                {plan.name}
              </h3>

              <p
                style={{
                  fontSize: "14px",
                  color: "#475569",
                  marginBottom: "18px",
                }}
              >
                {plan.for}
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
                {plan.includes.map((item) => (
                  <li
                    key={item}
                    style={{
                      fontSize: "15px",
                      marginBottom: "10px",
                    }}
                  >
                    {item}
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
                {plan.highlight ? "Get Started" : "Learn More"}
              </button>
            </div>
          ))}
        </div>

       
        <p
          style={{
            marginTop: "50px",
            textAlign: "center",
            fontSize: "15px",
            color: "#475569",
          }}
        >
          All programs require consistent effort and discipline. Pricing reflects
          long-term mentorship, structured guidance, and practical skill building —
          not short-term promises.
        </p>
      </div>
    </section>
  );
}
