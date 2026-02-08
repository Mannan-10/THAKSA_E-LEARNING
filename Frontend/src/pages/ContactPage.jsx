export default function ContactPage() {
  const isMobile = window.innerWidth <= 768;

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
            Contact Us
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "#475569",
              maxWidth: "720px",
              margin: "0 auto",
            }}
          >
            Reach out if you’re genuinely interested in structured learning,
            career guidance, or need clarity before committing.
          </p>
        </div>

  
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1.2fr",
            gap: "60px",
            alignItems: "flex-start",
          }}
        >
        
          <div>
            <h3
              style={{
                fontSize: "22px",
                fontWeight: "700",
                color: "#0f172a",
                marginBottom: "20px",
              }}
            >
              Get in Touch
            </h3>

            <p style={infoStyle}>
              📧 <strong>Email:</strong>{" "}
              <span style={valueStyle}>support@thaksa.com</span>
            </p>

            <p style={infoStyle}>
              📱 <strong>Phone / WhatsApp:</strong>{" "}
              <span style={valueStyle}>+91 99999 99999</span>
            </p>

            <p style={infoStyle}>
              🌐 <strong>Mode:</strong>{" "}
              <span style={valueStyle}>Online & Guided Sessions</span>
            </p>

            <div
              style={{
                marginTop: "28px",
                padding: "20px",
                background: "#ffffff",
                borderRadius: "16px",
                border: "1px solid #e5e7eb",
              }}
            >
              <p
                style={{
                  fontSize: "15px",
                  color: "#475569",
                  lineHeight: "1.6",
                }}
              >
                We value meaningful conversations. Please reach out if you are
                motivated to learn with discipline and a long-term mindset.
                Queries are typically responded to within 24–48 hours.
              </p>
            </div>
          </div>

          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "32px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
            }}
          >
            <form>
              <div style={{ marginBottom: "18px" }}>
                <label style={labelStyle}>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label style={labelStyle}>Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label style={labelStyle}>Subject</label>
                <input
                  type="text"
                  placeholder="What would you like to know?"
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={labelStyle}>Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your goals or questions"
                  style={{ ...inputStyle, resize: "none" }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "14px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

const infoStyle = {
  fontSize: "16px",
  color: "#475569",
  marginBottom: "14px",
};

const valueStyle = {
  fontWeight: "600",
  color: "#0f172a",
};

const labelStyle = {
  display: "block",
  fontSize: "14px",
  fontWeight: "600",
  marginBottom: "6px",
  color: "#334155",
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  fontSize: "15px",
  borderRadius: "10px",
  border: "1px solid #cbd5f5",
  outline: "none",
};
