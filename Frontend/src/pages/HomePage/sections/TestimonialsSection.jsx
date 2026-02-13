import { Box, Grid, Paper, Rating, Typography } from "@mui/material";

const testimonials = [
  {
    name: "Anjali S.",
    role: "Frontend Developer",
    quote: "The batch workflow made me consistent. I shipped projects that helped me land interviews.",
  },
  {
    name: "Rahul K.",
    role: "Software Engineer Intern",
    quote: "Mentor feedback was practical and direct. It improved my API and system design thinking.",
  },
  {
    name: "Divya R.",
    role: "CS Student",
    quote: "The structure feels professional, not random tutorials. Every week had a measurable outcome.",
  },
];

export default function TestimonialsSection() {
  return (
    <Box sx={{ mb: { xs: 6, md: 10 } }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 900,
          color: "#0f172a",
          mb: 3,
          fontFamily: "'Merriweather', Georgia, serif",
        }}
      >
        Learner Outcomes
      </Typography>

      <Grid container spacing={2.2}>
        {testimonials.map((item) => (
          <Grid key={item.name} size={{ xs: 12, md: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3.5,
                border: "1px solid rgba(30, 41, 59, 0.12)",
                height: "100%",
              }}
            >
              <Rating value={5} readOnly size="small" sx={{ mb: 1 }} />
              <Typography sx={{ color: "#334155", mb: 2 }}>"{item.quote}"</Typography>
              <Typography sx={{ fontWeight: 800, color: "#0f172a" }}>{item.name}</Typography>
              <Typography sx={{ color: "#0f766e", fontWeight: 600, fontSize: "0.9rem" }}>
                {item.role}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
