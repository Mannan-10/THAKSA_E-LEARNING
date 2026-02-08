export default function Contact() {
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
            Contact
          </span>

          <h2
            style={{
              fontSize: isMobile ? "30px" : "40px",
              fontWeight: "800",
              color: "#0f172a",
              marginBottom: "14px",
            }}
          >
            Let’s Talk About Your Learning Path
          </h2>

          <p
            style={{
              fontSize: "18px",
              color: "#475569",
              maxWidth: "640px",
              margin: "0 auto",
            }}
          >
            Whether you’re exploring, preparing, or already committed —
            feel free to reach out for clarity and guidance.
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
                marginBottom: "20px",
                color: "#0f172a",
              }}
            >
              Contact Information
            </h3>

            <p style={infoText}>
              📧 Email:{" "}
              <a
                href="mailto:support@thaksa.com"
                style={linkStyle}
              >
                support@thaksa.com
              </a>
            </p>

            <p style={infoText}>
              📱 Phone / WhatsApp:{" "}
              <a
                href="tel:+919999999999"
                style={linkStyle}
              >
                +91 99999 99999
              </a>
            </p>

            <p style={infoText}>
              📍 Mode: Online & Guided Sessions
            </p>

            <p
              style={{
                marginTop: "24px",
                fontSize: "16px",
                color: "#475569",
                lineHeight: "1.6",
              }}
            >
              We focus on meaningful conversations. Reach out if you’re
              genuinely interested in building a strong, structured
              career in technology.
            </p>
          </div>

          {/* RIGHT: CONTACT FORM */}
          <div
            style={{
              background: "#f8fafc",
              borderRadius: "20px",
              padding: "32px",
              border: "1px solid #e5e7eb",
            }}
          >
            <form>
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>Message</label>
                <textarea
                  placeholder="Tell us about your goals or questions"
                  rows={4}
                  style={{ ...inputStyle, resize: "none" }}
                />
              </div>

              <button
                type="submit"
                style={{
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "14px 24px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  width: "100%",
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

/* --- shared styles --- */
const infoText = {
  fontSize: "16px",
  color: "#475569",
  marginBottom: "14px",
};

const linkStyle = {
  color: "#2563eb",
  textDecoration: "none",
  fontWeight: "600",
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
