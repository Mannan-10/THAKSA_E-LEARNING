export default function Instructor() {
  const isMobile = window.innerWidth <= 768;

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
            marginBottom: "60px",
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
            Master Trainer & Instructor
          </span>

          <h2
            style={{
              fontSize: isMobile ? "30px" : "40px",
              fontWeight: "800",
              color: "#0f172a",
            }}
          >
            Learn From an Industry-Seasoned Mentor
          </h2>
        </div>

      
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1.4fr",
            gap: "60px",
            alignItems: "center",
          }}
        >
        
          <div style={{ textAlign: isMobile ? "center" : "left" }}>
            <div
              style={{
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                background: "#e5e7eb",
                marginBottom: "24px",
                marginInline: isMobile ? "auto" : "0",
                overflow: "hidden",
              }}
            >
              {/* Replace with real image */}
              <img
                src="/trainer.jpg"
                alt="Master Trainer"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            <h3
              style={{
                fontSize: "24px",
                fontWeight: "700",
                marginBottom: "6px",
                color: "#0f172a",
              }}
            >
              TharunKrishna Kaithoju
            </h3>

            <p
              style={{
                color: "#475569",
                fontSize: "16px",
                marginBottom: "14px",
              }}
            >
              Senior DevOps • Cloud • Data & ML Instructor
            </p>

       
            <div
              style={{
                display: "flex",
                gap: "16px",
                justifyContent: isMobile ? "center" : "flex-start",
              }}
            >
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                style={socialStyle}
              >
                LinkedIn
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                style={socialStyle}
              >
                Instagram
              </a>

              <a
                href="mailto:trainer@email.com"
                style={socialStyle}
              >
                Email
              </a>
            </div>
          </div>

          <div>
            <p style={paraStyle}>
              A senior industry professional with extensive hands-on experience
              in <strong>AWS Cloud, DevOps engineering, CI/CD automation,
              Infrastructure as Code, Data Science, Machine Learning,
              MLOps, and Selenium-based testing frameworks</strong>.
            </p>

            <p style={paraStyle}>
              Over the years, he has trained and mentored students and working
              professionals through long-term, structured programs focused on
              real-world problem solving, production-level practices, and
              industry-aligned workflows — not surface-level tooling.
            </p>

            <p style={paraStyle}>
              His teaching philosophy is rooted in discipline and realism.
              He does not believe in grand promises or shortcuts. Instead,
              he focuses on understanding each student’s mindset, strengthening
              fundamentals, and guiding them through a clear, achievable
              roadmap toward sustainable career growth.
            </p>

            <p style={paraStyle}>
              With a strong commitment to empowering motivated youth, his
              mission is to use every available resource today in a structured
              and focused way — helping students unlock their potential,
              build confidence, and create meaningful futures in technology.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


const paraStyle = {
  fontSize: "16px",
  lineHeight: "1.7",
  color: "#475569",
  marginBottom: "18px",
};

const socialStyle = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#2563eb",
  textDecoration: "none",
  padding: "6px 12px",
  borderRadius: "8px",
  border: "1px solid #bfdbfe",
};
