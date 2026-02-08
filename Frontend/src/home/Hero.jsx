export default function Hero() {
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024;

  return (
    <section
      style={{
        background: "linear-gradient(180deg, #eef6ff 0%, #f8fbff 100%)",
        padding: isMobile
          ? "60px 20px"
          : isTablet
          ? "80px 40px"
          : "100px 100px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : "1.1fr 0.9fr",
          gap: isMobile ? "40px" : "60px",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: isMobile ? "center" : "left" }}>
          <span
            style={{
              display: "inline-block",
              background: "#dbeafe",
              color: "#2563eb",
              padding: "6px 14px",
              borderRadius: "999px",
              fontSize: "14px",
              marginBottom: "24px",
            }}
          >
            #1 Tech Learning Platform
          </span>

          <h1
            style={{
              fontSize: isMobile ? "36px" : isTablet ? "46px" : "56px",
              lineHeight: "1.15",
              fontWeight: "800",
              marginBottom: "24px",
              color: "#0f172a",
            }}
          >
            Master Tech Skills,
            <br />
            <span style={{ color: "#2563eb" }}>
              Land Your Dream Job
            </span>
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "#475569",
              maxWidth: "520px",
              margin: isMobile ? "0 auto 40px" : "0 0 40px",
            }}
          >
            Join 500+ learners mastering AWS, DevOps, Data Science
            & more with project-based learning and certifications.
          </p>

          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: isMobile ? "center" : "flex-start",
              flexWrap: "wrap",
            }}
          >
            <button
              style={{
                background: "#2563eb",
                color: "white",
                padding: "14px 28px",
                borderRadius: "12px",
                border: "none",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Get Started Free →
            </button>

            <button
              style={{
                background: "transparent",
                color: "#2563eb",
                padding: "14px 28px",
                borderRadius: "12px",
                border: "2px solid #bfdbfe",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Watch Demo
            </button>
          </div>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "28px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
            maxWidth: isMobile ? "100%" : "420px",
            margin: isMobile ? "0 auto" : "0",
          }}
        >
          <h3 style={{ marginBottom: "6px" }}>
            Software Engineering Bootcamp
          </h3>
          <p style={{ color: "#16a34a", fontWeight: "600" }}>
            In Progress
          </p>

          <div style={{ marginTop: "20px" }}>
            <p style={{ marginBottom: "8px", color: "#475569" }}>
              Course Progress
            </p>
            <div
              style={{
                height: "8px",
                background: "#e5e7eb",
                borderRadius: "6px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "72%",
                  height: "100%",
                  background: "#2563eb",
                }}
              />
            </div>
            <p
              style={{
                textAlign: "right",
                fontSize: "14px",
                marginTop: "6px",
                color: "#2563eb",
                fontWeight: "600",
              }}
            >
              70%
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
              marginTop: "24px",
            }}
          >
            {[
              { label: "Modules", value: "6" },
              { label: "Months", value: "4" },
              { label: "Projects", value: "30" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: "#f1f5f9",
                  borderRadius: "14px",
                  padding: "14px",
                  textAlign: "center",
                }}
              >
                <h4
                  style={{
                    fontSize: "22px",
                    fontWeight: "700",
                  }}
                >
                  {item.value}
                </h4>
                <p style={{ fontSize: "14px", color: "#475569" }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
