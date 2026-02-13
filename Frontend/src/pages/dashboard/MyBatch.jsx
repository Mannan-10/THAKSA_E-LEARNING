import { useEffect } from "react";
import { useState } from "react";
import { getMyBatch } from "../../services/batchService";
import { Link } from "react-router-dom";

export default function MyBatch() {
  const [batch, setBatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBatch();
  },[]);

  const fetchBatch = async () => {
    try {
      const data = await getMyBatch();
      console.log(data);
      setBatch(data);
    } catch (err) {
      console.error(err);
    }
    finally {
      setLoading(false);
    }
  }
  if (loading) {
    return <p>Loading batch...</p>;
  }

  if (!batch) {
    return <p>You have not joined any batch yet.</p>;
  }

  return (
    <div>
      <h1 style={title}>My Batch</h1>
      <p style={subtitle}>Your assigned training batch details</p>

      <div style={card}>
        <h3>{batch.course_title}</h3>
        <p style={muted}>Batch: {batch.batch_name}</p>

        <div style={infoGrid}>
          <Info label="Start Date" value={formatDate(batch.start_date)} />
          <Info label="End Date" value={formatDate(batch.end_date)} />
          <Info label="Schedule" value={batch.schedule} />
          <Info label="Max Students" value={batch.max_students} />
        </div>
      </div>

      <div style={card}>
        <h3>Trainer</h3>
        <p style={{ fontWeight: "600" }}>{batch.instructor_name}</p>
        <p style={muted}>{batch.instructor_email}</p>
        {batch.course_id && (
          <Link to={`/dashboard/batch/${batch.id}/course/${batch.course_id}`}>
            Open Course
          </Link>
        )}
      </div>



      <div style={card}>
        <h3>Batch Guidelines</h3>
        <ul style={list}>
          <li>Attendance is mandatory</li>
          <li>Assignments must be submitted on time</li>
          <li>Recordings available for revision</li>
          <li>Weekly doubt-clearing sessions</li>
        </ul>
      </div>
    </div>
  );
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}


const title = {
  fontSize: "28px",
  fontWeight: "800",
  marginBottom: "6px",
};

const subtitle = {
  color: "#64748b",
  marginBottom: "32px",
};

const card = {
  background: "white",
  padding: "24px",
  borderRadius: "16px",
  marginBottom: "24px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
};

const infoGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "16px",
  marginTop: "16px",
};

function Info({ label, value }) {
  return (
    <div>
      <p style={muted}>{label}</p>
      <p style={{ fontWeight: "600" }}>{value}</p>
    </div>
  );
}

const muted = {
  color: "#64748b",
  fontSize: "14px",
};

const list = {
  paddingLeft: "18px",
  lineHeight: "1.8",
};
