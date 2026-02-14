import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
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
        py: { xs: 6, md: 9 },
        minHeight: "calc(100vh - 80px)",
        backgroundColor: "#f8fafc",
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={1} textAlign="center" sx={{ mb: 5 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Contact Us
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 720, mx: "auto" }}>
            Reach out for course guidance, enrollment details, and learning support.
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 5 }}>
            <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2.5 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Contact Information
                </Typography>
                <Stack spacing={1.5}>
                  <Typography>
                    <strong>Email:</strong> support@thaksa.com
                  </Typography>
                  <Typography>
                    <strong>Phone / WhatsApp:</strong> +91 99999 99999
                  </Typography>
                  <Typography>
                    <strong>Response Time:</strong> Within 24-48 hours
                  </Typography>
                  <Typography>
                    <strong>Availability:</strong> Monday to Saturday
                  </Typography>
                </Stack>
              </CardContent>
            </Card>

            <Card
              elevation={0}
              sx={{ mt: 2, border: "1px solid", borderColor: "divider", borderRadius: 2.5 }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography color="text.secondary">
                  Share your learning goals and background. We will suggest the most
                  suitable path and next steps.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, lg: 7 }}>
            <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2.5 }}>
              <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Send a Message
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
                  <Button type="submit" variant="contained" sx={{ py: 1.2 }} disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
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
