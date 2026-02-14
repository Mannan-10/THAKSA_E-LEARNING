import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

const plans = [
  {
    name: "Foundation Track",
    description: "For beginners building strong fundamentals",
    price: "INR 000",
    duration: "3 Months",
    cta: "Choose Plan",
    includes: [
      "Core fundamentals and concepts",
      "Structured weekly roadmap",
      "Recorded session access",
      "Basic project exposure",
    ],
  },
  {
    name: "Professional Track",
    description: "For learners preparing for industry roles",
    price: "INR 000",
    duration: "4 Months",
    cta: "Choose Plan",
    includes: [
      "Complete structured curriculum",
      "Live instructor-led sessions",
      "Real-world projects",
      "Career and interview guidance",
      "Continuous evaluation and feedback",
    ],
  },
  {
    name: "Advanced Mentorship",
    description: "For learners seeking deep personalized guidance",
    price: "INR 000",
    duration: "4+ Months",
    cta: "Choose Plan",
    includes: [
      "Everything in Professional Track",
      "1-to-1 mentorship sessions",
      "Advanced system thinking",
      "Personalized growth roadmap",
      "Extended career support",
    ],
  },
];

export default function PricingPage() {
  return (
    <Box
      sx={{
        py: { xs: 6, md: 9 },
        minHeight: "calc(100vh - 80px)",
        backgroundColor: "#f8fafc",
      }}
    >
      <Container maxWidth="lg">
        <Stack textAlign="center" spacing={1} sx={{ mb: 5 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Pricing Plans
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 760, mx: "auto" }}>
            Transparent pricing designed for structured learning and consistent progress.
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {plans.map((plan) => (
            <Grid key={plan.name} size={{ xs: 12, md: 6, lg: 4 }}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 2.5,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <CardContent sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {plan.name}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mt: 0.4 }}>
                    {plan.description}
                  </Typography>
                  <Typography sx={{ mt: 2, fontSize: { xs: "1.9rem", md: "2.1rem" }, fontWeight: 700, color: "primary.main" }}>
                    {plan.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.7 }}>
                    Duration: {plan.duration}
                  </Typography>

                  <Stack spacing={1} sx={{ mb: 2 }}>
                    {plan.includes.map((item) => (
                      <Typography key={item} variant="body2" color="text.secondary">
                        - {item}
                      </Typography>
                    ))}
                  </Stack>

                  <Button variant="contained" sx={{ mt: "auto", py: 1.1 }}>
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography textAlign="center" color="text.secondary" sx={{ mt: 4 }}>
          Contact us for custom guidance and plan recommendations.
        </Typography>
      </Container>
    </Box>
  );
}
