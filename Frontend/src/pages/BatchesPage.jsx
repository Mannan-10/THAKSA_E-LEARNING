import { Box, Button, Card, CardContent, Chip, Container, Grid, Stack, Typography } from "@mui/material";

const batches = [
  {
    name: "Full Stack Cloud and DevOps Batch",
    domains: "AWS, DevOps, CI/CD, Cloud Automation",
    duration: "4 Months",
    start: "March 2026",
    mode: "Online (Live + Guided)",
    status: "Open",
  },
  {
    name: "Data Science and Machine Learning Batch",
    domains: "Python, Data Analysis, ML, MLOps",
    duration: "4 Months",
    start: "April 2026",
    mode: "Online (Live + Projects)",
    status: "Upcoming",
  },
  {
    name: "Software Testing and Automation Batch",
    domains: "Selenium, Automation, Testing Fundamentals",
    duration: "3 Months",
    start: "February 2026",
    mode: "Online",
    status: "Closed",
  },
];

const statusColor = {
  Open: { bg: "#dcfce7", text: "#166534" },
  Upcoming: { bg: "#e0e7ff", text: "#3730a3" },
  Closed: { bg: "#f1f5f9", text: "#475569" },
};

export default function BatchesPage() {
  return (
    <Box sx={{ py: { xs: 7, md: 10 }, background: "#f8fbff", minHeight: "calc(100vh - 80px)" }}>
      <Container maxWidth="lg">
        <Stack textAlign="center" spacing={1.5} sx={{ mb: { xs: 5, md: 7 } }}>
          <Typography variant="h3">Training Batches</Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 760, mx: "auto" }}>
            Carefully structured batches designed to guide motivated learners through
            disciplined, long-term skill development.
          </Typography>
        </Stack>

        <Grid container spacing={2.5}>
          {batches.map((batch) => (
            <Grid key={batch.name} size={{ xs: 12, sm: 6, lg: 4 }}>
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
                  <Chip
                    label={batch.status}
                    size="small"
                    sx={{
                      alignSelf: "flex-start",
                      mb: 1.8,
                      bgcolor: statusColor[batch.status].bg,
                      color: statusColor[batch.status].text,
                      fontWeight: 700,
                    }}
                  />
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 800 }}>
                    {batch.name}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 0.8 }}>{batch.domains}</Typography>
                  <Typography variant="body2" sx={{ mb: 0.6 }}>Duration: {batch.duration}</Typography>
                  <Typography variant="body2" sx={{ mb: 0.6 }}>Start: {batch.start}</Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>Mode: {batch.mode}</Typography>
                  <Button
                    variant="contained"
                    disabled={batch.status === "Closed"}
                    sx={{ mt: "auto", borderRadius: 2.5 }}
                  >
                    {batch.status === "Open" ? "Apply Now" : batch.status === "Upcoming" ? "Notify Me" : "Closed"}
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
