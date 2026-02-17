import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { getPublicCourses } from "../services/userServices";
import RatingStars from "../components/RatingStars";
import { getCourseRatingSummary } from "../services/reviewService";
import EmptyState from "../components/EmptyState";
import CourseSkeleton from "../components/skeletons/CourseSkeleton";

export default function CoursesPage() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    let active = true;

    const loadCourses = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getPublicCourses({ page, limit: 9 });
        if (!active) return;
        const courseList = Array.isArray(response?.courses) ? response.courses : [];
        setCourses(courseList);
        setTotalPages(Number(response?.totalPages || 1));

        // Load ratings for all courses
        const ratingsData = {};
        await Promise.all(
          courseList.map(async (course) => {
            try {
              const rating = await getCourseRatingSummary(course.id);
              ratingsData[course.id] = {
                average: parseFloat(rating?.average_rating || 0),
                count: parseInt(rating?.total_reviews || 0),
              };
            } catch {
              ratingsData[course.id] = { average: 0, count: 0 };
            }
          })
        );
        if (active) setRatings(ratingsData);
      } catch (requestError) {
        if (!active) return;
        setError(requestError?.response?.data?.message || "Failed to load courses");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadCourses();
    return () => {
      active = false;
    };
  }, [page]);

  return (
    <Box sx={{ py: { xs: 6, md: 9 }, backgroundColor: "#f8fafc", minHeight: "calc(100vh - 80px)" }}>
      <Container maxWidth="lg">
        <Stack textAlign="center" spacing={1.2} sx={{ mb: { xs: 4.5, md: 6 } }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Courses
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 780, mx: "auto" }}>
            Explore complete course pathways with outcomes, live delivery structure,
            instructor support, and batch availability.
          </Typography>
        </Stack>

        {error ? <Alert severity="error" sx={{ mb: 2.5 }}>{error}</Alert> : null}

        {loading ? (
          <Grid container spacing={2.5}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Grid key={item} size={{ xs: 12, md: 6, lg: 4 }}>
                <CourseSkeleton />
              </Grid>
            ))}
          </Grid>
        ) : courses.length === 0 ? (
          <EmptyState
            icon="search"
            title="No Courses Available"
            description="There are no courses available at the moment. Please check back later or contact support if you think this is an error."
            actionLabel="Go to Homepage"
            onAction={() => navigate("/")}
          />
        ) : (
          <>
            <Grid container spacing={2.5}>
              {courses.map((course) => (
                <Grid key={course.id} size={{ xs: 12, md: 6, lg: 4 }}>
                  <Card
                    elevation={0}
                    sx={{ height: "100%", border: "1px solid", borderColor: "divider", borderRadius: 2.5 }}
                  >
                    <CardContent sx={{ p: 2.5, display: "flex", flexDirection: "column", height: "100%" }}>
                      <Chip
                        label="Live Program"
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ alignSelf: "flex-start", mb: 1.4 }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          mb: 0.5,
                          cursor: "pointer",
                          "&:hover": { color: "primary.main" }
                        }}
                        onClick={() => navigate(`/courses/${course.id}`)}
                      >
                        {course.title}
                      </Typography>

                      {ratings[course.id] && (
                        <Box sx={{ mb: 1 }}>
                          <RatingStars
                            rating={ratings[course.id].average}
                            size="small"
                            showNumber
                            reviewCount={ratings[course.id].count}
                          />
                        </Box>
                      )}

                      <Typography color="text.secondary" sx={{ mb: 1.6 }}>
                        {course.description}
                      </Typography>

                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        <strong>Instructor:</strong> {course.instructor_name}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        <strong>Level:</strong> {course.level || "N/A"}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1.4 }}>
                        <strong>Price:</strong> INR {course.price}
                      </Typography>

                      <Button
                        variant="contained"
                        sx={{ mt: "auto", textTransform: "none" }}
                        onClick={() => navigate(`/batches?courseId=${course.id}`)}
                      >
                        View Batches
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Stack alignItems="center" sx={{ mt: 3.5 }}>
              <Pagination
                page={page}
                count={Math.max(totalPages, 1)}
                onChange={(_, value) => setPage(value)}
                color="primary"
              />
            </Stack>
          </>
        )}
      </Container>
    </Box>
  );
}
