import { Box, Button, Card, CardContent, Chip, Stack, Typography } from "@mui/material";

const courses = [
  { id: 1, title: "Cloud and DevOps Engineering", modules: 12, studentsEnrolled: 156, lastUpdated: "2 days ago", status: "Published" },
  { id: 2, title: "Full Stack Software Engineering", modules: 15, studentsEnrolled: 210, lastUpdated: "1 week ago", status: "Published" },
  { id: 3, title: "Advanced System Design", modules: 8, studentsEnrolled: 0, lastUpdated: "In Progress", status: "Draft" },
];

export default function ManageCourses() {
  return (
    <Box>
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} sx={{ mb: 2 }} spacing={1}>
        <Box>
          <Typography variant="h4" sx={{ mb: 0.5 }}>Manage Courses</Typography>
          <Typography color="text.secondary">Create, edit, and organize your curriculum and materials.</Typography>
        </Box>
        <Button variant="contained" sx={{ borderRadius: 2.5 }}>Create New Course</Button>
      </Stack>

      <Stack spacing={1.6}>
        {courses.map((course) => (
          <Card key={course.id} elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0" }}>
            <CardContent sx={{ p: 2.4 }}>
              <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" spacing={1.5}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>{course.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.modules} modules | {course.studentsEnrolled} students | Updated {course.lastUpdated}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
                  <Chip
                    label={course.status}
                    size="small"
                    sx={{
                      fontWeight: 700,
                      bgcolor: course.status === "Published" ? "#dcfce7" : "#fef9c3",
                      color: course.status === "Published" ? "#166534" : "#854d0e",
                    }}
                  />
                  <Button size="small" variant="outlined">Edit</Button>
                  <Button size="small" variant="outlined">Content</Button>
                  <Button size="small" variant="outlined">Analytics</Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
