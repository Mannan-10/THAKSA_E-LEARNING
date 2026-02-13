import { Box, Card, CardContent, Grid, List, ListItem, Typography } from "@mui/material";

const infoItems = [
  { label: "Batch Code", value: "THK-DEV-0425" },
  { label: "Start Date", value: "15 April 2025" },
  { label: "Schedule", value: "Mon-Sat | 7:00-9:00 PM" },
  { label: "Mode", value: "Live + Recorded" },
];

export default function MyBatch() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 0.6 }}>My Batch</Typography>
      <Typography color="text.secondary" sx={{ mb: 3.2 }}>
        Your assigned training batch details.
      </Typography>

      <Card elevation={0} sx={cardSx}>
        <CardContent sx={{ p: { xs: 2.2, md: 3 } }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.4 }}>
            AWS, DevOps and Data Science Bootcamp
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Batch Duration: 4 Months
          </Typography>

          <Grid container spacing={2}>
            {infoItems.map((item) => (
              <Grid key={item.label} size={{ xs: 12, sm: 6 }}>
                <Typography variant="body2" color="text.secondary">{item.label}</Typography>
                <Typography sx={{ fontWeight: 700, color: "#0f172a" }}>{item.value}</Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <Card elevation={0} sx={cardSx}>
        <CardContent sx={{ p: { xs: 2.2, md: 3 } }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.6 }}>Trainer</Typography>
          <Typography sx={{ fontWeight: 700 }}>Tharunkrishna Kaithoju</Typography>
          <Typography color="text.secondary">Senior DevOps, Cloud, Data and ML Instructor</Typography>
        </CardContent>
      </Card>

      <Card elevation={0} sx={cardSx}>
        <CardContent sx={{ p: { xs: 2.2, md: 3 } }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.6 }}>Batch Guidelines</Typography>
          <List sx={{ pl: 2, color: "#334155" }}>
            <ListItem sx={{ display: "list-item", py: 0.3 }}>Attendance is mandatory for live sessions.</ListItem>
            <ListItem sx={{ display: "list-item", py: 0.3 }}>Assignments must be submitted on time.</ListItem>
            <ListItem sx={{ display: "list-item", py: 0.3 }}>Recordings are available for revision.</ListItem>
            <ListItem sx={{ display: "list-item", py: 0.3 }}>Weekly doubt-clearing sessions are provided.</ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}

const cardSx = {
  borderRadius: 3,
  border: "1px solid #e2e8f0",
  boxShadow: "0 14px 26px rgba(15,23,42,0.05)",
  mb: 2.2,
};
