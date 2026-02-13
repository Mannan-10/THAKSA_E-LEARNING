import { Box, Button, Card, CardContent, Container, Grid, Stack, TextField, Typography } from "@mui/material";

export default function ContactPage() {
  return (
    <Box sx={{ py: { xs: 7, md: 10 }, background: "#f8fbff", minHeight: "calc(100vh - 80px)" }}>
      <Container maxWidth="lg">
        <Stack textAlign="center" spacing={1.5} sx={{ mb: { xs: 5, md: 7 } }}>
          <Typography variant="h3">Contact Us</Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 760, mx: "auto" }}>
            Reach out if you are genuinely interested in structured learning,
            career guidance, or need clarity before committing.
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 800 }}>
              Get in Touch
            </Typography>
            <Typography sx={{ mb: 1.2 }}><strong>Email:</strong> support@thaksa.com</Typography>
            <Typography sx={{ mb: 1.2 }}><strong>Phone / WhatsApp:</strong> +91 99999 99999</Typography>
            <Typography sx={{ mb: 2.2 }}><strong>Mode:</strong> Online and Guided Sessions</Typography>

            <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e2e8f0" }}>
              <CardContent>
                <Typography color="text.secondary">
                  We value meaningful conversations. Please reach out if you are
                  motivated to learn with discipline and a long-term mindset.
                  Queries are typically responded to within 24 to 48 hours.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid #e2e8f0",
                boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
                <Stack component="form" spacing={2.2}>
                  <TextField label="Full Name" placeholder="Enter your full name" />
                  <TextField label="Email Address" type="email" placeholder="you@example.com" />
                  <TextField label="Subject" placeholder="What would you like to know?" />
                  <TextField
                    label="Message"
                    placeholder="Tell us about your goals or questions"
                    multiline
                    rows={4}
                  />
                  <Button type="submit" variant="contained" sx={{ py: 1.4, borderRadius: 2.5 }}>
                    Send Message
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
