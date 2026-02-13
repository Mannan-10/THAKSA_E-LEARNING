import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Card, CardContent, Grid, LinearProgress, Stack, Typography } from "@mui/material";

const courses = [
  { title: "AWS and DevOps Bootcamp", progress: 62, duration: "4 Months" },
  { title: "Data Science and ML", progress: 28, duration: "5 Months" },
];

export default function MyCourses() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 0.6 }}>My Courses</Typography>
      <Typography color="text.secondary" sx={{ mb: 3.2 }}>
        Track and continue your learning.
      </Typography>

      <Grid container spacing={2.2}>
        {courses.map((course) => (
          <Grid key={course.title} size={{ xs: 12, md: 6 }}>
            <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0", height: "100%" }}>
              <CardContent sx={{ p: 2.6, display: "flex", flexDirection: "column", height: "100%" }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.4 }}>
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.8 }}>
                  {course.duration}
                </Typography>

                <LinearProgress
                  variant="determinate"
                  value={course.progress}
                  sx={{ height: 10, borderRadius: 999, bgcolor: "#e2e8f0", "& .MuiLinearProgress-bar": { borderRadius: 999 } }}
                />

                <Typography variant="body2" color="text.secondary" sx={{ mt: 1.2 }}>
                  {course.progress}% completed
                </Typography>

                <Stack direction="row" sx={{ mt: "auto", pt: 2 }}>
                  <Button component={RouterLink} to="#" variant="contained" sx={{ borderRadius: 2.5 }}>
                    Continue Learning
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
