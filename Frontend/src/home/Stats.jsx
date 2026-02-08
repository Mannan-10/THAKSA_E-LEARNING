export default function Stats() {
  return (
    <section
      style={{
        background: "#ffffff",
        padding: "80px 0",
      }}
    >

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          marginBottom: "60px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
    
        <div style={{ display: "flex" }}>
          {["#3b82f6", "#06b6d4", "#6366f1", "#8b5cf6"].map(
            (color, i) => (
              <div
                key={i}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: color,
                  marginLeft: i === 0 ? "0" : "-10px",
                  border: "3px solid white",
                }}
              />
            )
          )}
        </div>

        <p
          style={{
            fontSize: "16px",
            color: "#334155",
          }}
        >
          <strong>4.9/5</strong> from{" "}
          <strong>5,000+</strong> reviews
        </p>
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "24px",
        }}
      >
        {[
          {
            value: "500+",
            label: "Learners Enrolled",
          },
          {
            value: "6+",
            label: "Software Courses",
          },
          {
            value: "94%",
            label: "Success Rate",
          },
          {
            value: "20+",
            label: "verified Company Partners",
          },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              padding: "32px",
              textAlign: "center",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.06)",
            }}
          >
            <h3
              style={{
                fontSize: "36px",
                fontWeight: "800",
                marginBottom: "10px",
                color: "#0f172a",
              }}
            >
              {item.value}
            </h3>
            <p
              style={{
                fontSize: "16px",
                color: "#64748b",
              }}
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
