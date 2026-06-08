import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { getUserDashboard, getPublicCourses } from "../../services/userServices";
import RatingStars from "../../components/RatingStars";
import CourseSkeleton from "../../components/skeletons/CourseSkeleton";

export default function MyCourses() {
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    let active = true;
    const loadData = async () => {
      try {
        const [dashData, publicData] = await Promise.all([
          getUserDashboard(),
          getPublicCourses({ limit: 100 }), // Fetch up to 100 courses
        ]);
        if (!active) return;
        setEnrolledCourses(dashData?.enrolledCourses || []);
        const courses = Array.isArray(publicData) ? publicData : publicData?.courses || [];
        setAllCourses(courses);

        // Load ratings directly from pre-fetched course properties
        const ratingsData = {};
        courses.forEach((course) => {
          ratingsData[course.id] = {
            average: parseFloat(course.average_rating || 0),
            count: parseInt(course.review_count || 0),
          };
        });
        if (active) setRatings(ratingsData);
      } catch (err) {
        console.error("Failed to load courses:", err);
      } finally {
        if (active) setLoading(false);
      }
    };
    loadData();
    return () => { active = false; };
  }, []);

  if (loading) {
    return (
      <Box>
        <Typography variant="h4" sx={{ mb: 3.2 }}>My Courses</Typography>
        <Grid container spacing={2.5}>
          {[1, 2, 3].map((item) => (
            <Grid key={item} size={{ xs: 12, sm: 6, lg: 4 }}>
              <CourseSkeleton />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 0.6 }}>My Courses</Typography>
      <Typography color="text.secondary" sx={{ mb: 3.2 }}>
        Track and continue your learning.
      </Typography>

      {enrolledCourses.length === 0 ? (
        <Alert severity="info" sx={{ mb: 3 }}>You are not enrolled in any courses yet.</Alert>
      ) : (
        <Grid container spacing={2.2} sx={{ mb: 4 }}>
          {enrolledCourses.map((course) => (
            <Grid key={course.id} size={{ xs: 12, md: 6 }}>
              <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0", height: "100%" }}>
                <CardContent sx={{ p: 2.6, display: "flex", flexDirection: "column", height: "100%" }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.4 }}>
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.8 }}>
                    Instructor: {course.instructor || "N/A"}
                  </Typography>

                  <LinearProgress
                    variant="determinate"
                    value={course.progress || 0}
                    sx={{ height: 10, borderRadius: 999, bgcolor: "#e2e8f0", "& .MuiLinearProgress-bar": { borderRadius: 999 } }}
                  />

                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1.2 }}>
                    {course.progress || 0}% completed
                  </Typography>

                  <Stack direction="row" sx={{ mt: "auto", pt: 2 }}>
                    <Button
                      component={RouterLink}
                      to={`/dashboard/courses/${course.id}`}
                      variant="contained"
                      sx={{ borderRadius: 2.5 }}
                    >
                      Continue Learning
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.6 }}>Explore All Courses</Typography>
      <Typography color="text.secondary" sx={{ mb: 2.5 }}>
        Browse available courses and start learning something new.
      </Typography>

      {allCourses.length === 0 ? (
        <Alert severity="info">No courses available at the moment.</Alert>
      ) : (
        <Grid container spacing={2.2}>
          {allCourses.map((course) => (
            <Grid key={course.id} size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0", height: "100%", display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ p: 2.4, flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      mb: 0.4,
                      cursor: "pointer",
                      "&:hover": { color: "primary.main" }
                    }}
                    onClick={() => navigate(`/courses/${course.id}`)}
                  >
                    {course.title}
                  </Typography>
                  {ratings[course.id] && (
                    <Box sx={{ mb: 0.6 }}>
                      <RatingStars
                        rating={ratings[course.id].average}
                        size="small"
                        showNumber
                        reviewCount={ratings[course.id].count}
                      />
                    </Box>
                  )}
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.6 }}>
                    Instructor: {course.instructor_name || "N/A"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.6 }}>
                    Level: {course.level || "N/A"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: INR {course.price || "Free"}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2.4, pt: 0 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate(`/batches?courseId=${course.id}`)}
                    sx={{ borderRadius: 2.5, textTransform: "none" }}
                  >
                    View Batches & Enroll
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
