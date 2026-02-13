import { Box, Button, Card, CardContent, Container, Grid, Stack, Typography } from "@mui/material";

const courses = [
  {
    title: "Cloud and DevOps Engineering",
    desc: "A structured program covering cloud infrastructure, DevOps practices, CI/CD pipelines, and real-world automation.",
    level: "Beginner to Advanced",
    duration: "4 Months",
    skills: "AWS, Linux, Docker, Kubernetes, CI/CD, Terraform",
  },
  {
    title: "Data Science and Machine Learning",
    desc: "Learn data analysis, machine learning, and deployment workflows with a strong focus on fundamentals and projects.",
    level: "Intermediate",
    duration: "4 Months",
    skills: "Python, Pandas, ML, Statistics, MLOps",
  },
  {
    title: "Software Testing and Automation",
    desc: "Build a strong testing foundation with automation frameworks and practical test engineering skills.",
    level: "Beginner",
    duration: "3 Months",
    skills: "Selenium, Java, Automation Testing, QA Fundamentals",
  },
  {
    title: "Full Stack Software Engineering",
    desc: "Develop full stack applications with strong backend logic, frontend structure, and system thinking.",
    level: "Intermediate",
    duration: "4 Months",
    skills: "JavaScript, React, Backend APIs, Databases",
  },
];

export default function CoursesPage() {
  return (
    <Box sx={{ py: { xs: 7, md: 10 }, background: "#f8fbff", minHeight: "calc(100vh - 80px)" }}>
      <Container maxWidth="lg">
        <Stack textAlign="center" spacing={1.5} sx={{ mb: { xs: 5, md: 7 } }}>
          <Typography variant="h3">Courses</Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 760, mx: "auto" }}>
            Professionally designed programs focused on building strong fundamentals,
            practical skills, and long-term career readiness.
          </Typography>
        </Stack>

        <Grid container spacing={2.5}>
          {courses.map((course) => (
            <Grid key={course.title} size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                }}
              >
                <CardContent sx={{ p: 3, display: "flex", flexDirection: "column", height: "100%" }}>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 800 }}>
                    {course.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {course.desc}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.7 }}><strong>Level:</strong> {course.level}</Typography>
                  <Typography variant="body2" sx={{ mb: 0.7 }}><strong>Duration:</strong> {course.duration}</Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}><strong>Skills Covered:</strong> {course.skills}</Typography>
                  <Button variant="contained" sx={{ mt: "auto", borderRadius: 2.5 }}>
                    View Course Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
