export default function Newsletter() {
  const isMobile = window.innerWidth <= 768;

  return (
    <section
      style={{
        padding: isMobile ? "60px 20px" : "100px 100px",
        background: "linear-gradient(180deg, #eef6ff 0%, #ffffff 100%)",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: isMobile ? "28px" : "38px",
            fontWeight: "800",
            color: "#0f172a",
            marginBottom: "16px",
          }}
        >
          Stay Connected With Structured Learning
        </h2>

        <p
          style={{
            fontSize: "18px",
            color: "#475569",
            marginBottom: "40px",
            lineHeight: "1.6",
          }}
        >
          Get updates on new batches, learning roadmaps, and
          guidance content — designed for motivated learners
          who value clarity and discipline.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: "16px",
            justifyContent: "center",
          }}
        >
          <input
            type="email"
            placeholder="Enter your email address"
            style={{
              flex: "1",
              padding: "14px 16px",
              fontSize: "16px",
              borderRadius: "12px",
              border: "1px solid #cbd5f5",
              outline: "none",
              minWidth: isMobile ? "100%" : "320px",
            }}
          />

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
            Subscribe
          </button>
        </div>

        <p
          style={{
            fontSize: "14px",
            color: "#64748b",
            marginTop: "16px",
          }}
        >
          No spam. Only meaningful updates.
        </p>
      </div>
    </section>
  );
}
