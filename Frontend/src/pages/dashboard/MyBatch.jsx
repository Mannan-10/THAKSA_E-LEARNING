import { useEffect } from "react";
import { useState } from "react";
import { getMyBatch } from "../../services/batchService";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
  Chip,
  Divider,
  LinearProgress,
} from "@mui/material";

export default function MyBatch() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBatch();
  }, []);

  const fetchBatch = async () => {
    try {
      const data = await getMyBatch();
      console.log(data);
      setBatches(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getBatchStatus = (start, end) => {
    const now = new Date();
    const startDate = start ? new Date(start) : null;
    const endDate = end ? new Date(end) : null;

    if (endDate && now > endDate) return "Completed";
    if (startDate && now < startDate) return "Upcoming";
    return "Ongoing";
  };

  const getDaysRemaining = (end) => {
    if (!end) return null;
    const today = new Date();
    const endDate = new Date(end);
    const diff = endDate - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getProgress = () => {
    return Math.floor(Math.random() * 100); 
  };


  if (loading) {
    return <p>Loading batch...</p>;
  }

  if (!batches) {
    return <p>You have not joined any batch yet.</p>;
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        My Batches
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={4}>
        Your assigned training batch details
      </Typography>

      {batches.map((batch) => {
        const status = getBatchStatus(batch.start_date, batch.end_date);
        const daysRemaining = getDaysRemaining(batch.end_date);
        const progress = getProgress();
        const isExpired = status === "Completed";

        return (
          <Card key={batch.id} sx={{ mb: 4, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              {/* HEADER */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6" fontWeight="bold">
                  {batch.course_title}
                </Typography>

                <Chip
                  label={status}
                  color={
                    status === "Ongoing"
                      ? "success"
                      : status === "Upcoming"
                        ? "warning"
                        : "default"
                  }
                />
              </Box>

              <Typography color="text.secondary" mb={2}>
                Batch: {batch.batch_name}
              </Typography>

              {/* DAYS REMAINING */}
              {status === "Ongoing" && daysRemaining > 0 && (
                <Typography variant="body2" color="primary" mb={2}>
                  {daysRemaining} days remaining
                </Typography>
              )}

              {/* PROGRESS */}
              <Box mb={2}>
                <Typography variant="body2" mb={1}>
                  Progress: {progress}%
                </Typography>
                <LinearProgress variant="determinate" value={progress} />
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* TRAINER */}
              <Typography fontWeight="bold">Trainer</Typography>
              <Typography>{batch.instructor_name}</Typography>
              <Typography color="text.secondary">
                {batch.instructor_email}
              </Typography>

              {/* BUTTON */}
              <Button
                component={Link}
                to={`/dashboard/batch/${batch.id}/course/${batch.course_id}`}
                variant="contained"
                disabled={isExpired}
                sx={{ mt: 2 }}
              >
                {isExpired ? "Batch Expired" : "Open Course"}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const muted = {
  color: "#64748b",
  fontSize: "14px",
};
