import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import useToast from "../hooks/useToast";
import { enrollBatch, getPublicBatches } from "../services/batchService";
import RatingStars from "../components/RatingStars";
import { getCourseRatingSummary } from "../services/reviewService";
import BatchSkeleton from "../components/skeletons/BatchSkeleton";

const statusLabel = {
  upcoming: "Upcoming",
  started: "Started",
  completed: "Completed",
};

const chipStyle = {
  upcoming: { bg: "#dcfce7", color: "#166534" },
  started: { bg: "#e0e7ff", color: "#3730a3" },
  completed: { bg: "#f1f5f9", color: "#475569" },
};

const statusOrder = ["upcoming", "started", "completed"];
const toValidStatus = (value = "") => {
  const normalized = String(value).toLowerCase();
  return statusOrder.includes(normalized) ? normalized : "all";
};

const formatDate = (value, timezone) => {
  if (!value) return "TBA";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "TBA";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: timezone || "Asia/Kolkata",
  });
};

export default function BatchesPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { showToast } = useToast();

  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrollingId, setEnrollingId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(toValidStatus(searchParams.get("status")));
  const [ratings, setRatings] = useState({});

  const courseId = searchParams.get("courseId") || "";

  useEffect(() => {
    let active = true;

    const loadBatches = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getPublicBatches({
          courseId: courseId || undefined,
          status: selectedStatus !== "all" ? selectedStatus : undefined,
          limit: 100,
        });
        if (!active) return;
        const batchList = Array.isArray(response?.batches) ? response.batches : [];
        setBatches(batchList);

        // Load ratings for unique courses
        const uniqueCourseIds = [...new Set(batchList.map(b => b.course_id).filter(Boolean))];
        const ratingsData = {};
        await Promise.all(
          uniqueCourseIds.map(async (id) => {
            try {
              const rating = await getCourseRatingSummary(id);
              ratingsData[id] = {
                average: parseFloat(rating?.average_rating || 0),
                count: parseInt(rating?.total_reviews || 0),
              };
            } catch {
              ratingsData[id] = { average: 0, count: 0 };
            }
          })
        );
        if (active) setRatings(ratingsData);
      } catch (requestError) {
        if (!active) return;
        setError(requestError?.response?.data?.message || "Failed to load batches");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadBatches();
    return () => {
      active = false;
    };
  }, [courseId, selectedStatus]);

  const grouped = useMemo(() => {
    const initial = { upcoming: [], started: [], completed: [] };
    batches.forEach((batch) => {
      const status = (batch.status || "").toLowerCase();
      if (initial[status]) initial[status].push(batch);
    });
    return initial;
  }, [batches]);

  const sections = (selectedStatus === "all" ? statusOrder : [selectedStatus]).filter(
    (status) => grouped[status].length > 0
  );

  const handleEnroll = async (batchId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setEnrollingId(batchId);
      await enrollBatch(batchId);
      showToast("Enrolled successfully", "success");
    } catch (requestError) {
      showToast(requestError?.response?.data?.message || "Failed to enroll", "error");
    } finally {
      setEnrollingId(null);
    }
  };

  return (
    <Box sx={{ py: { xs: 6, md: 9 }, backgroundColor: "#f8fafc", minHeight: "calc(100vh - 80px)" }}>
      <Container maxWidth="lg">
        <Stack textAlign="center" spacing={1.2} sx={{ mb: { xs: 4.5, md: 6 } }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Batches
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 780, mx: "auto" }}>
            Browse live cohorts by status and choose the right joining window for your learning plan.
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: "wrap" }}>
          <Button
            variant={selectedStatus === "all" ? "contained" : "outlined"}
            onClick={() => setSelectedStatus("all")}
            sx={{ textTransform: "none" }}
          >
            All
          </Button>
          {statusOrder.map((status) => (
            <Button
              key={status}
              variant={selectedStatus === status ? "contained" : "outlined"}
              onClick={() => setSelectedStatus(status)}
              sx={{ textTransform: "none" }}
            >
              {statusLabel[status]}
            </Button>
          ))}
        </Stack>

        {error ? <Alert severity="error" sx={{ mb: 2.5 }}>{error}</Alert> : null}

        {loading ? (
          <Grid container spacing={2.2}>
            {[1, 2, 3, 4].map((item) => (
              <Grid key={item} size={{ xs: 12, md: 6 }}>
                <BatchSkeleton />
              </Grid>
            ))}
          </Grid>
        ) : batches.length === 0 ? (
          <Alert severity="info">No batches found for the current filter.</Alert>
        ) : sections.length === 0 ? (
          <Alert severity="info">No batches match the selected status.</Alert>
        ) : (
          sections.map((status) => (
            <Box key={status} sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                {statusLabel[status]} Batches
              </Typography>

              <Grid container spacing={2.2}>
                {grouped[status].map((batch) => (
                  <Grid key={batch.id} size={{ xs: 12, md: 6 }}>
                    <Card
                      elevation={0}
                      sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2.5, height: "100%" }}
                    >
                      <CardContent sx={{ p: 2.5, display: "flex", flexDirection: "column", height: "100%" }}>
                        <Chip
                          label={statusLabel[status]}
                          size="small"
                          sx={{
                            alignSelf: "flex-start",
                            mb: 1.3,
                            bgcolor: chipStyle[status].bg,
                            color: chipStyle[status].color,
                            fontWeight: 700,
                          }}
                        />

                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.6 }}>
                          {batch.batch_name}
                        </Typography>
                        <Typography
                          color="text.secondary"
                          sx={{
                            mb: 0.5,
                            cursor: "pointer",
                            "&:hover": { color: "primary.main" }
                          }}
                          onClick={() => navigate(`/courses/${batch.course_id}`)}
                        >
                          {batch.course_title}
                        </Typography>

                        {ratings[batch.course_id] && (
                          <Box sx={{ mb: 1.2 }}>
                            <RatingStars
                              rating={ratings[batch.course_id].average}
                              size="small"
                              showNumber
                              reviewCount={ratings[batch.course_id].count}
                            />
                          </Box>
                        )}

                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                          <strong>Instructor:</strong> {batch.instructor_name}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                          <strong>Schedule:</strong>{" "}
                          {batch.schedule || `${batch.days_of_week || "TBA"} | ${batch.session_time || "TBA"}`}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                          <strong>Start:</strong> {formatDate(batch.start_date, batch.timezone)}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                          <strong>Timezone:</strong> {batch.timezone || "Asia/Kolkata"}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1.8 }}>
                          <strong>Seats:</strong>{" "}
                          {batch.available_seats === null
                            ? "Open"
                            : `${batch.available_seats} left (${batch.enrolled_count} enrolled)`}
                        </Typography>

                        <Button
                          variant="contained"
                          disabled={status === "completed" || enrollingId === batch.id}
                          sx={{ mt: "auto", textTransform: "none" }}
                          onClick={() => handleEnroll(batch.id)}
                        >
                          {status === "upcoming"
                            ? enrollingId === batch.id
                              ? "Joining..."
                              : "Join Batch"
                            : status === "started"
                              ? enrollingId === batch.id
                                ? "Requesting..."
                                : "Request Access"
                              : "Completed"}
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))
        )}
      </Container>
    </Box>
  );
}
