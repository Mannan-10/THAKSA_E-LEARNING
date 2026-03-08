import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { submitContactMessage } from "../../services/contactService";
import useToast from "../../hooks/useToast";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactPage() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = "Enter a valid email address";
    }
    if (!formData.subject.trim()) nextErrors.subject = "Subject is required";
    if (!formData.message.trim()) nextErrors.message = "Message is required";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const response = await submitContactMessage(formData);
      showToast(response.message || "Message sent successfully.", "success");
      setFormData(initialFormData);
    } catch (error) {
      showToast(
        error?.response?.data?.message || "Failed to send message. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        py: { xs: 7, md: 10 },
        minHeight: "calc(100vh - 80px)",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(circle at 12% 15%, rgba(15,118,110,0.13) 0%, rgba(15,118,110,0) 45%), radial-gradient(circle at 90% 10%, rgba(37,99,235,0.14) 0%, rgba(37,99,235,0) 40%), linear-gradient(180deg, #f8fbff 0%, #eef2f7 100%)",
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Stack spacing={1.2} textAlign="center" sx={{ mb: 5.5 }}>
          <Chip
            icon={<SchoolRoundedIcon sx={{ color: "#0f766e !important" }} />}
            label="Training Support Desk"
            sx={{
              alignSelf: "center",
              bgcolor: "rgba(15,118,110,0.1)",
              color: "#0f766e",
              fontWeight: 700,
            }}
          />
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              color: "#0f172a",
              fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif",
              fontSize: { xs: "1.9rem", md: "2.5rem" },
            }}
          >
            Contact the Training Team
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 760, mx: "auto" }}>
            Reach out for course roadmap guidance, batch schedules, and enrollment help.
            Share your background and we will suggest the best training path.
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 5 }}>
            <Stack spacing={2}>
              <Card
                elevation={0}
                sx={{
                  border: "1px solid rgba(148,163,184,0.25)",
                  borderRadius: 3,
                  backgroundColor: "rgba(255,255,255,0.92)",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 2.2, color: "#0f172a" }}>
                    Contact Information
                  </Typography>
                  <Stack spacing={1.8}>
                    <Stack direction="row" spacing={1.2} alignItems="center">
                      <EmailRoundedIcon sx={{ color: "#1d4ed8", fontSize: 20 }} />
                      <Typography sx={{ color: "#334155" }}>
                        <strong>Email:</strong> thaksa.academy@gmail.com
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1.2} alignItems="center">
                      <PhoneRoundedIcon sx={{ color: "#0f766e", fontSize: 20 }} />
                      <Typography sx={{ color: "#334155" }}>
                        <strong>Phone:</strong> +91 90525 15284
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1.2} alignItems="center">
                      <WhatsAppIcon sx={{ color: "#25D366", fontSize: 20 }} />
                      <Typography sx={{ color: "#334155" }}>
                        <strong>WhatsApp:</strong> +91 90525 15284
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1.2} alignItems="center">
                      <AccessTimeRoundedIcon sx={{ color: "#d97706", fontSize: 20 }} />
                      <Typography sx={{ color: "#334155" }}>
                        <strong>Support Hours:</strong> Mon-Sat, 9 AM-7 PM IST
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>

              <Card
                elevation={0}
                sx={{
                  border: "1px solid rgba(148,163,184,0.25)",
                  borderRadius: 3,
                  background: "linear-gradient(135deg, rgba(15,118,110,0.08) 0%, rgba(37,99,235,0.08) 100%)",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography sx={{ fontWeight: 700, color: "#0f172a", mb: 1 }}>
                    Best way to get quick guidance
                  </Typography>
                  <Typography sx={{ color: "#475569", mb: 2 }}>
                    Send your current skill level, preferred domain, and available timings.
                    Our team will recommend suitable courses and upcoming batches.
                  </Typography>
                  <Button
                    component="a"
                    href="https://wa.me/919052515284?text=Hi%20THAKSA%2C%20I%20need%20training%20guidance."
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained"
                    startIcon={<WhatsAppIcon />}
                    sx={{
                      bgcolor: "#25D366",
                      textTransform: "none",
                      fontWeight: 800,
                      borderRadius: 2,
                      "&:hover": { bgcolor: "#1ebe58" },
                    }}
                  >
                    Chat on WhatsApp
                  </Button>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, lg: 7 }}>
            <Card
              elevation={0}
              sx={{
                border: "1px solid rgba(148,163,184,0.25)",
                borderRadius: 3,
                backgroundColor: "rgba(255,255,255,0.95)",
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, md: 3.2 } }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2.3, color: "#0f172a" }}>
                  Send an Enquiry
                </Typography>
                <Stack component="form" spacing={2} onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                      />
                    </Grid>
                  </Grid>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    error={Boolean(errors.subject)}
                    helperText={errors.subject}
                  />
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    error={Boolean(errors.message)}
                    helperText={errors.message}
                  />
                  <Button type="submit" variant="contained" sx={{ py: 1.25 }} disabled={loading}>
                    {loading ? "Sending..." : "Submit Enquiry"}
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
