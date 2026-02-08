export default function BatchesPage() {
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024;

  const batches = [
    {
      name: "Full Stack Cloud & DevOps Batch",
      domains: "AWS • DevOps • CI/CD • Cloud Automation",
      duration: "4 Months",
      start: "March 2026",
      mode: "Online (Live + Guided)",
      status: "Open",
    },
    {
      name: "Data Science & Machine Learning Batch",
      domains: "Python • Data Analysis • ML • MLOps",
      duration: "4 Months",
      start: "April 2026",
      mode: "Online (Live + Projects)",
      status: "Upcoming",
    },
    {
      name: "Software Testing & Automation Batch",
      domains: "Selenium • Automation • Testing Fundamentals",
      duration: "3 Months",
      start: "February 2026",
      mode: "Online",
      status: "Closed",
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
            Training Batches
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "#475569",
              maxWidth: "720px",
              margin: "0 auto",
            }}
          >
            Carefully structured batches designed to guide motivated learners
            through disciplined, long-term skill development.
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
          {batches.map((batch) => (
            <div
              key={batch.name}
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
    
              <span
                style={{
                  alignSelf: "flex-start",
                  fontSize: "13px",
                  fontWeight: "600",
                  padding: "6px 12px",
                  borderRadius: "999px",
                  marginBottom: "16px",
                  background:
                    batch.status === "Open"
                      ? "#dcfce7"
                      : batch.status === "Upcoming"
                      ? "#e0e7ff"
                      : "#f1f5f9",
                  color:
                    batch.status === "Open"
                      ? "#166534"
                      : batch.status === "Upcoming"
                      ? "#3730a3"
                      : "#475569",
                }}
              >
                {batch.status}
              </span>

              <div>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#0f172a",
                    marginBottom: "10px",
                  }}
                >
                  {batch.name}
                </h3>

                <p style={infoStyle}>{batch.domains}</p>
                <p style={infoStyle}>Duration: {batch.duration}</p>
                <p style={infoStyle}>Start: {batch.start}</p>
                <p style={infoStyle}>Mode: {batch.mode}</p>
              </div>

        
              <button
                disabled={batch.status === "Closed"}
                style={{
                  marginTop: "24px",
                  background:
                    batch.status === "Open"
                      ? "#2563eb"
                      : "#cbd5f5",
                  color: "white",
                  border: "none",
                  padding: "12px",
                  borderRadius: "12px",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor:
                    batch.status === "Open"
                      ? "pointer"
                      : "not-allowed",
                }}
              >
                {batch.status === "Open"
                  ? "Apply Now"
                  : batch.status === "Upcoming"
                  ? "Notify Me"
                  : "Closed"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const infoStyle = {
  fontSize: "15px",
  color: "#475569",
  marginBottom: "6px",
};
