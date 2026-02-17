import { useEffect, useState } from "react";
import { enrollBatch, getAllBatches } from "../../services/batchService";

export default function Batches() {
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    let active = true;

    const loadBatches = async () => {
      const data = await getAllBatches();
      if (active) {
        setBatches(Array.isArray(data) ? data : []);
      }
    };

    loadBatches();
    return () => {
      active = false;
    };
  }, []);

  const handleEnroll = async (batchId) => {
    try {
      await enrollBatch(batchId);
      alert("Enrolled successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to enroll");
    }
  };

  return (
    <div>
      <h1>Available Batches</h1>
      {batches.map((batch) => (
        <div key={batch.id} style={card}>
          <h3>{batch.title}</h3>
          <p>Batch: {batch.batch_name}</p>
          <p>Schedule: {batch.schedule}</p>

          <button onClick={() => handleEnroll(batch.batch_id || batch.id)}>
            Join Batch
          </button>
        </div>
      ))}
    </div>
  );
}

const card = {
  background: "white",
  padding: "24px",
  borderRadius: "16px",
  marginBottom: "24px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
};
