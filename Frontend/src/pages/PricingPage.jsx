import { Box, Button, Card, CardContent, Container, Grid, List, ListItem, Stack, Typography } from "@mui/material";

const plans = [
  {
    name: "Foundation Track",
    for: "Beginners building strong fundamentals",
    price: "INR 15,000",
    duration: "3 Months",
    includes: [
      "Core fundamentals and concepts",
      "Structured learning roadmap",
      "Recorded session access",
      "Basic project exposure",
    ],
    highlight: false,
  },
  {
    name: "Professional Track",
    for: "Serious learners preparing for industry roles",
    price: "INR 30,000",
    duration: "4 Months",
    includes: [
      "Complete structured curriculum",
      "Live instructor-led sessions",
      "Real-world projects",
      "Career and interview guidance",
      "Continuous evaluation and feedback",
    ],
    highlight: true,
  },
  {
    name: "Advanced Mentorship",
    for: "Highly motivated learners seeking deep guidance",
    price: "INR 45,000",
    duration: "4+ Months",
    includes: [
      "Everything in Professional Track",
      "1-to-1 mentorship sessions",
      "Advanced system and architecture thinking",
      "Personalized growth roadmap",
      "Extended career support",
    ],
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <Box sx={{ py: { xs: 7, md: 10 }, background: "#f8fbff", minHeight: "calc(100vh - 80px)" }}>
      <Container maxWidth="lg">
        <Stack textAlign="center" spacing={1.5} sx={{ mb: { xs: 5, md: 7 } }}>
          <Typography variant="h3">Pricing</Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 760, mx: "auto" }}>
            Transparent pricing designed for learners who value structured growth,
            discipline, and long-term career development.
          </Typography>
        </Stack>

        <Grid container spacing={2.5}>
          {plans.map((plan) => (
            <Grid key={plan.name} size={{ xs: 12, md: 6, lg: 4 }}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  p: 0.5,
                  border: plan.highlight ? "2px solid #2563eb" : "1px solid #e2e8f0",
                  boxShadow: plan.highlight ? "0 20px 34px rgba(37,99,235,0.16)" : "0 10px 25px rgba(0,0,0,0.05)",
                  transform: plan.highlight ? { lg: "translateY(-8px)" } : "none",
                }}
              >
                <CardContent sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>{plan.name}</Typography>
                  <Typography color="text.secondary" sx={{ mb: 1.6 }}>{plan.for}</Typography>
                  <Typography sx={{ fontSize: { xs: "2rem", md: "2.25rem" }, fontWeight: 900, color: "#2563eb" }}>
                    {plan.price}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>Duration: {plan.duration}</Typography>
                  <List dense sx={{ mb: 2 }}>
                    {plan.includes.map((item) => (
                      <ListItem key={item} sx={{ px: 0, color: "#475569" }}>
                        {item}
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    variant={plan.highlight ? "contained" : "outlined"}
                    sx={{ mt: "auto", borderRadius: 2.5 }}
                  >
                    {plan.highlight ? "Get Started" : "Learn More"}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography textAlign="center" color="text.secondary" sx={{ mt: 5 }}>
          All programs require consistent effort and discipline. Pricing reflects
          mentorship, structured guidance, and practical skill building.
        </Typography>
      </Container>
    </Box>
  );
}
